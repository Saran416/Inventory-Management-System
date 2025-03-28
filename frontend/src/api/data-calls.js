const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchBrandsVsSales() {
  try {
    const response = await fetch(`${API_URL}/data/brands-vs-sales`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const responseData = await response.json();
    if (!response.ok) {
      return { success: false, message: responseData.message || "Failed to fetch brands vs sales data" };
    }
    return responseData;
  } catch (error) {
    console.error("Error fetching brands vs sales data:", error);
    return {
      success: false,
      message: "Network error: Unable to connect to the server.",
    };
  }
}

export async function fetchMostSoldProducts() {
  try {
    const response = await fetch(`${API_URL}/data/most-sold-products`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const responseData = await response.json();
    if (!response.ok) {
      return { success: false, message: responseData.message || "Failed to fetch most sold products data" };
    }
    return responseData;
  } catch (error) {
    console.error("Error fetching most sold products data:", error);
    return {
      success: false,
      message: "Network error: Unable to connect to the server.",
    };
  }
};

export async function fetchBusiestStores() {
  try {
    const response = await fetch(`${API_URL}/data/busiest-stores`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const responseData = await response.json();
    if (!response.ok) {
      return { success: false, message: responseData.message || "Failed to fetch busiest stores data" };
    }
    return responseData;
  } catch (error) {
    console.error("Error fetching busiest stores data:", error);
    return {
      success: false,
      message: "Network error: Unable to connect to the server.",
    };
  }
}