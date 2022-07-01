/*Certificate Details*/
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if (urlParams.get("id")) {
  const id = urlParams.get("id");
  showcert(id);
} else {
  showcert(01);
}

function showcert(id) {
  id = id < 10 && id.toString().length < 2 ? `0${id}` : `${id}`;

  fetch(`/api/certs/${id}`)
    .then((response) => response.json())
    .then((d) => {
      document.location.href = "#title";
      document.getElementById("cert_title").innerHTML = d.title;
      document.getElementById("title").innerHTML = d.title;
      document.getElementById(
        "cert pic"
      ).innerHTML = `<img src="./assets/theme/images/certificates/src/${d.image}.png" srcset="./assets/theme/images/certificates/${d.image}.webp" alt="${d.title}" style="height: 75%; width:75%">`;
      document.getElementById("desc").innerHTML = `From: ${d.provider}`;
      document.getElementById("provider").innerHTML = d.provider;
      document.getElementById("issued-date").innerHTML = d.date;
      document.getElementById("verify-btn").setAttribute("href", d.link);
      if (d.isLast == true) {
        document.getElementById("next-cert-btn").style.display = "none";
        document.getElementsByClassName("ic-right")[0].style.display = "none";
      } else {
        document.getElementById("next-cert-btn").style.display = "";
        document
          .getElementById("next-cert-btn")
          .setAttribute("onclick", `showcert(${parseInt(id) + 1})`);
        document
          .getElementById("right carousel-control")
          .setAttribute("onclick", `showcert(${parseInt(id) + 1})`);
        document.getElementsByClassName("ic-right")[0].style.display = "";
      }
      if (id != 1) {
        document
          .getElementById("left carousel-control")
          .setAttribute("onclick", `showcert(${parseInt(id) - 1})`);
        document.getElementsByClassName("ic-left")[0].style.display = "";
        document
          .getElementById("prev-cert-btn")
          .setAttribute("onclick", `showcert(${parseInt(id) - 1})`);
        document.getElementById("prev-cert-btn").style.display = "";
      } else {
        document.getElementById("prev-cert-btn").style.display = "none";
        document.getElementsByClassName("ic-left")[0].style.display = "none";
      }
    });

  return false;
}
