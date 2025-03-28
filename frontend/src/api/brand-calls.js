const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchBrandNames() {
  try {
    const response = await fetch(`${API_URL}/brand/fetch-brand-names`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || "Failed to fetch all brands" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching all brands:", error);
    return { success: false, message: "Network error: Unable to connect to the server." };
  }
}

export async function fetchBrands(brand_name) {
  try {
    const queryParams = `?brand_name=${encodeURIComponent(brand_name)}`;
    const response = await fetch(`${API_URL}/brand/fetch-brands${queryParams}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || "Failed to fetch brands" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching brands:", error);
    return { success: false, message: "Network error: Unable to connect to the server." };
  }
};

export async function addBrand(brand_name, contact_info) {
  if (!brand_name || !contact_info) {
    return { success: false, message: "Brand name and contact info are required" };
  }

  try {
    const response = await fetch(`${API_URL}/brand/add-brand`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand_name, contact_info }),
    });

    const data = await response.json();
    if (!response.ok) {
      return { success: false, message: data.message || "Failed to add brand" };
    }

    return data;
  } catch (error) {
    console.error("Error adding brand:", error);
    return { success: false, message: "Network error: Unable to connect to the server." };
  }
};

export async function deleteBrand(brand_name) {
  if (!brand_name) {
    return { success: false, message: "Brand name is required" };
  }

  try {
    const response = await fetch(`${API_URL}/brand/delete-brand`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand_name }),
    });

    const data = await response.json();
    if (!response.ok) {
      return { success: false, message: data.message || "Failed to delete brand" };
    }

    return data;
  } catch (error) {
    console.error("Error deleting brand:", error);
    return { success: false, message: "Network error: Unable to connect to the server." };
  }
}