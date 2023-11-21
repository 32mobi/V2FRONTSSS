export default async function getProductById(id) {
  const response = await fetch(
    `https://three2mobiles.onrender.com/api/modeldetails/${id}`,
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
    throw new Error(`Failed to fetch product details for ID ${id}`);
  }

  return response.json();
}
