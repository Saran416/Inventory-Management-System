const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchStock(location, product_name) {
  try {
    const queryParams = `?location=${encodeURIComponent(location)}&product_name=${encodeURIComponent(product_name)}`;

    const response = await fetch(`${API_URL}/stock/fetch-stock${queryParams}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
    // console.log("response", response);
    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || "Failed to fetch stock data" };
    }
    // console.log("response", response);
    return await response.json();
  } catch (error) {
    console.error("Error fetching stock data", error);

    return {
      success: false,
      message: "Network error: Unable to connect to the server.",
    };
  }
}

export async function fetchStockByEmployeeID(product_name, employee_ID) {
  try {
    const queryParams = `?product_name=${encodeURIComponent(product_name)}&employee_ID=${employee_ID}`;

    const response = await fetch(`${API_URL}/stock/fetch-stock-by-employee-id${queryParams}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || "Failed to fetch stock data" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching stock data", error);

    return {
      success: false,
      message: "Network error: Unable to connect to the server.",
    };
  }
}








