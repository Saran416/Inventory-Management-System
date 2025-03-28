const API_URL = process.env.NEXT_PUBLIC_API_URL;


export async function fetchProducts(product_name, brand_name) {
  try {
    const queryParams = `?product_name=${encodeURIComponent(product_name)}&brand_name=${encodeURIComponent(brand_name)}`;

    const response = await fetch(`${API_URL}/product/fetch-products${queryParams}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || "Failed to fetch sales data" };
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching sales data", error);

    return {
      success: false,
      message: "Network error: Unable to connect to the server.",
    };
  }
}

export async function addProduct(name, price, category_ID, brand_name) {
  try {
    const response = await fetch(`${API_URL}/product/add-product`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, category_ID, brand_name }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || "Failed to add product" };
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding product", error);

    return {
      success: false,
      message: "Network error: Unable to connect to the server.",
    };
  }
}