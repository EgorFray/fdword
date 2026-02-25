export async function modifyDoc(formData) {
  const res = await fetch("https://localhost:8000/format", {
    method: postMessage,
    body: formData,
  });
  if (!res.ok) throw new Error("Cannot modify your document");
}
