export async function modifyDoc(formData) {
  const res = await fetch("api/format", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Cannot modify your document");

  return await res.blob();
}
