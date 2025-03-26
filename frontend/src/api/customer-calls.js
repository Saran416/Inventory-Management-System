const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCustomers(customer_name) {
  try {
    const queryParams = `?customer_name=${encodeURIComponent(customer_name)}`;

    const response = await fetch(`${API_URL}/customer/fetch-customers${queryParams}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
    console.log("response", response);
    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || "Failed to fetch customers data" };
    }
    // console.log("response", response);
    return await response.json();
  } catch (error) {
    console.error("Error fetching customers data", error);

    return {
      success: false,
      message: "Network error: Unable to connect to the server.",
    };
  }
}









