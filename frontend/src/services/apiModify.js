export async function modifyDoc(formData) {
  const res = await fetch("https://localhost:8000/format", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Cannot modify your document");

  return await res.blob();
}
