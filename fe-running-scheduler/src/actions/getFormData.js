export async function action({ request }) {
  const res = await request.formData();
  const data = Object.fromEntries(res.entries()); // simple way to convert FormData to object
  return data;
}
