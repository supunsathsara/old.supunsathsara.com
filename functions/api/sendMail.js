// Script configuration
const config = {
  from: "<no-reply@supunsathsara.com>",
  admin_email: "contact@supunsathsara.com",
  email_field: "eml", // email field name
  form_fields: ["name", "message"], // list of required fields
  honeypot_field: "eml2", // honeypot field name
};

// --------

// utility function to convert object to url string
const urlfy = (obj) =>
  Object.keys(obj)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]))
    .join("&");

// Helper function to return JSON response
const JSONResponse = (message, status = 200) => {
  let headers = {
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },

    status: status,
  };

  let response = {
    message: message,
  };

  return new Response(JSON.stringify(response), headers);
};

addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method === "OPTIONS") {
    event.respondWith(handleOptions(request));
  } else {
    event.respondWith(handle(request));
  }
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function handleOptions(request) {
  if (
    request.headers.get("Origin") !== null &&
    request.headers.get("Access-Control-Request-Method") !== null &&
    request.headers.get("Access-Control-Request-Headers") !== null
  ) {
    // Handle CORS pre-flight request.
    return new Response(null, {
      headers: corsHeaders,
    });
  } else {
    // Handle standard OPTIONS request.
    return new Response(null, {
      headers: {
        Allow: "GET, HEAD, POST, OPTIONS",
      },
    });
  }
}

async function handle(request) {
  try {
    const form = await request.json();

    // Honeypot / anti-spam check
    // Honeypot field should be hidden on the frontend (via css),
    // and always have an empty value. If value is not empty, then (most likely) the form has been filled-in by spam-bot
    if (form[config.honeypot_field] !== "") {
      return JSONResponse("Invalid request", 400);
    }

    // Validate form inputs
    for (let i = 0; i < config.form_fields.length; i++) {
      let field = config.form_fields[i];
      if (form[field] === "") {
        return JSONResponse(`${field} is required`, 400);
      }
    }

    // Validate email field
    let email_regex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      form[config.email_field] == "" ||
      !email_regex.test(form[config.email_field])
    ) {
      return JSONResponse("Please, enter valid email address", 400);
    }

    // assign email address to the form
    form["email"] = form[config.email_field];

    const admin_template = `
  <html>
  <head>
      <title>New message from ${form.name}</title>
  </head>
  <body>
  New message has been sent via website.<br><br>
  
  <b>Name:</b> ${form.name} <br>
  <b>Email:</b> ${form.email} <br>
  <b>Subject:</b> ${form.subject} </br>
  <br>
  <b>Message:</b><br>
  ${form.message.replace(/(?:\r\n|\r|\n)/g, "<br>")}
  
  </body>
  </html>
  `;

    const user_template = `
           Hello ${form.name}, <br><br>

           Thank you for contacting me! <br>

          I have received your message and I will get back to you as soon as possible.
          <br><br>
          <i> ~supunsathsara.com </i>
           `;

    let admin_data = {
      personalizations: [{ to: [{ email: config.admin_email }] }],
      from: { email: config.from },
      reply_to: { email: form.email },
      subject: `New message from ${form.name}`,
      content: [{ type: "text/html", value: admin_template }],
    };

    let admin_options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SG_API}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admin_data),
    };

    let user_data = {
      personalizations: [{ to: [{ email: form.email }] }],
      from: { email: config.from },
      reply_to: { email: config.admin_email, name: "Supun Sathsara" },
      subject: "Thank you for contacting me!",
      content: [
        {
          type: "text/html",
          value: user_template,
        },
      ],
    };

    let user_options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SG_API}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user_data),
    };

    try {
      let results = await Promise.all([
        fetch(`https://api.sendgrid.com/v3/mail/send`, admin_options),
        fetch(`https://api.sendgrid.com/v3/mail/send`, user_options),
      ]);
      console.log("Got results");
      console.log(results);

      return JSONResponse("Message has been sent");
    } catch (err) {
      console.log("Error");
      console.log(err);
      return JSONResponse("Oops! Something went wrong.", 400);
    }
  } catch (err) {
    return new Response("©supunsathsara.com");
  }
}
