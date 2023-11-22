export default async function getIndividualArticle(id) {
  const response = await fetch(`https://three2mobiles.onrender.com/api/articles/${id}`);

  if (!response.ok) {
    const errorMessage = `Failed to fetch article with ID ${id}. Status: ${response.status} - ${response.statusText}`;
    throw new Error(errorMessage);
  }

  return response.json();
}
