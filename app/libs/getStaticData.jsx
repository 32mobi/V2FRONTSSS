export async function fetchStaticData() {
  try {
    const response = await fetch(
      "https://three2mobiles.onrender.com/api/statics/retrieve/1/",
      {
        cache: "force-cache",
      },
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching static data");
  }
}
