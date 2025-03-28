const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchSales(start_date, end_date, location, salesman_name, product_name) {
  try {
    const queryParams = `?start_date=${encodeURIComponent(start_date)}&end_date=${encodeURIComponent(end_date)}&location=${encodeURIComponent(location)}&salesman_name=${encodeURIComponent(salesman_name)}&product_name=${encodeURIComponent(product_name)}`;

    const response = await fetch(`${API_URL}/sales/fetch-sales${queryParams}`, {
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

export async function addSale(customer_name, customer_number, product_ID, quantity, employee_ID) {
  try {
    const response = await fetch(`${API_URL}/sales/add-sale`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customer_name, customer_number, product_ID, quantity, employee_ID }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || "Failed to add sale" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding sale", error);

    return {
      success: false,
      message: "Network error: Unable to connect to the server.",
    };
  }
}







