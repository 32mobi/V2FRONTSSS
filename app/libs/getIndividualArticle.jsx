export default async function getIndividualArticle(id) {
  const response = await fetch(`https://three2mobiles.onrender.com/api/articles/${id}`,
    { cache: "no-cache" });
    if(!response.ok){
      throw new Error("Failed");
    }
    return response.json()
}