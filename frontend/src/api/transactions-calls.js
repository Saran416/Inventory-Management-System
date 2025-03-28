const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchInventoryTransactions(start_date, end_date, from_location, to_location, product_name) {
  try {
    const queryParams = `?start_date=${encodeURIComponent(start_date)}&end_date=${encodeURIComponent(end_date)}&from_location=${encodeURIComponent(from_location)}&to_location=${encodeURIComponent(to_location)}&product_name=${encodeURIComponent(product_name)}`;

    const response = await fetch(`${API_URL}/transactions/fetch-inventory-transactions${queryParams}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const responseData = await response.json();
    if (!response.ok) {
      return { success: false, message: responseData.message || "Failed to fetch inventory transactions" };
    }
    return responseData;
      
  } catch (error) {
    console.error("Error fetching inventory transactions:", error);
    return { 
      success: false, 
      message: "Network error: Unable to connect to the server.",
    };
  }
};

export async function fetchFactoryOrders(start_date, end_date, employee_name, product_name, processed_status) {
  try {
    const queryParams = `?start_date=${encodeURIComponent(start_date)}&end_date=${encodeURIComponent(end_date)}&employee_name=${encodeURIComponent(employee_name)}&product_name=${encodeURIComponent(product_name)}&processed=${encodeURIComponent(processed_status)}`;

    const response = await fetch(`${API_URL}/transactions/fetch-factory-orders${queryParams}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const responseData = await response.json();
    if (!response.ok) {
      return { success: false, message: responseData.message || "Failed to fetch factory orders" };
    }
    return responseData;
      
  } catch (error) {
    console.error("Error fetching factory orders:", error);
    return { 
      success: false, 
      message: "Network error: Unable to connect to the server.",
    };
  }
}