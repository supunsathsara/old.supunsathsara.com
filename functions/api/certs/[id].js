export async function onRequestGet({ params }) {
  const res = await fetch(`https://fx5j7c.deta.dev/certs/${params.id}`);
  const data = await res.json();
  //data.image = `https://supunsathsara.com/assets/theme/images/Certs/${data.image}`;
  //data.thumbnail = `https://supunsathsara.com/assets/theme/images/Certs/${data.thumbnail}`;
  const headers = { "content-type": "application/json" };
  const info = JSON.stringify(data, null, 2);
  return new Response(info, { headers });
}
