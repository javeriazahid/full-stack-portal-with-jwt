const API_BASE_URL = "http://localhost:5000/api"; 


function getHeaders(token, isJSON = true) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (isJSON) headers["Content-Type"] = "application/json";
  return headers;
}


export async function apiGet(endpoint, token) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: getHeaders(token, false),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}


export async function apiPost(endpoint, body, token) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}


export async function apiPut(endpoint, body, token) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: getHeaders(token),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}


export async function apiDelete(endpoint, token) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: getHeaders(token, false),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
