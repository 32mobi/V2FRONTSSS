export default async function getModelDetails() {
  try {
    const response = await fetch(
      "https://three2mobiles.onrender.com/api/modeldetails/",
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
    return {
      props: {
        data,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}
