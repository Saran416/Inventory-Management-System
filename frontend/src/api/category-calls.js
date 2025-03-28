const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCategories() {
  try {
    const response = await fetch(`${API_URL}/category/fetch-categories`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error fetching categories: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching sales data", error);

    return {
      success: false,
      message: "Network error: Unable to connect to the server.",
    };
  };
};