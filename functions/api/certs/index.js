export async function onRequestGet() {
  const res = await fetch(`https://fx5j7c.deta.dev/certs/`);
  const data = await res.json();
  /* data.items.forEach((cert) => {
    cert.image = `https://supunsathsara.com/assets/theme/images/Certs/${cert.image}`;
    cert.thumbnail = `https://supunsathsara.com/assets/theme/images/Certs/${cert.thumbnail}`;
  });*/
  const certs = JSON.stringify(data.items, null, 2);
  const headers = { "content-type": "application/json" };
  return new Response(certs, { headers });
}
