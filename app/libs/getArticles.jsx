export default async function getArticles() {
  try {
    const url = "https://three2mobiles.onrender.com/api/articles/";
    const response = await fetch(url, {
      cache: "force-cache",
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch articles from ${url}. Status: ${response.status}`
      );
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid data format. Expected an array.");
    }

    return data;
  } catch (error) {
    console.error("Error in getArticles:", error.message);
    throw error;
  }
}
