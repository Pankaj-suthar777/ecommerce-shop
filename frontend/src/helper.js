const API = "https://proshipshop.onrender.com";

export async function fetchFromAPI(endPoint, opts) {
  const { method, body } = { method: "POST", body: null, ...opts };

  const res = await fetch(`${API}/${endPoint}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const r = await res.json();
  console.log(r);

  return r;
}
