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
    console.log(responseData);
    return responseData;
      
  } catch (error) {
    console.error("Error fetching inventory transactions:", error);
    return { 
      success: false, 
      message: "Network error: Unable to connect to the server.",
    };
  }
};

export async function fetchInventoryTransactionsByStoreManagerID(start_date, end_date, to_location, product_name, manager_ID) {
  try {
    const queryParams = `?start_date=${encodeURIComponent(start_date)}&end_date=${encodeURIComponent(end_date)}&from_location=${encodeURIComponent(to_location)}&product_name=${encodeURIComponent(product_name)}&manager_ID=${manager_ID}`;
    console.log(queryParams);
    const response = await fetch(`${API_URL}/transactions/fetch-inventory-transactions-by-store-manager-id${queryParams}`, {
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
}

export async function fetchInventoryTransactionsByWarehouseManagerID(start_date, end_date, from_location, product_name, manager_ID) {
  try {
    const queryParams = `?start_date=${encodeURIComponent(start_date)}&end_date=${encodeURIComponent(end_date)}&from_location=${encodeURIComponent(from_location)}&product_name=${encodeURIComponent(product_name)}&manager_ID=${manager_ID}`;
    console.log(queryParams);
    const response = await fetch(`${API_URL}/transactions/fetch-inventory-transactions-by-warehouse-manager-id${queryParams}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }); 

    const responseData = await response.json();

    if (!response.ok) {
      return { success: false, message: responseData.message || "Failed to fetch inventory transactions" };
    }
    console.log(responseData);
    return responseData;

  } catch (error) {
    console.error("Error fetching inventory transactions:", error);
    return { 
      success: false, 
      message: "Network error: Unable to connect to the server.",
    };
  }
}

export async function fetchFactoryOrders(start_date, end_date, product_name, manager_ID) {
  try {
    const queryParams = `?start_date=${encodeURIComponent(start_date)}&end_date=${encodeURIComponent(end_date)}&product_name=${encodeURIComponent(product_name)}&manager_ID=${manager_ID}`;

    const response = await fetch(`${API_URL}/transactions/fetch-factory-orders${queryParams}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const responseData = await response.json();
    if (!response.ok) {
      return { success: false, message: responseData.message || "Failed to fetch factory orders" };
    }
    // console.log(responseData);
    return responseData;
      
  } catch (error) {
    console.error("Error fetching factory orders:", error);
    return { 
      success: false, 
      message: "Network error: Unable to connect to the server.",
    };
  }
}

export async function addInventoryTransaction(warehouse_ID, emp_ID, prod_ID, stock_quantity) {
  try {

    const response = await fetch(`${API_URL}/transactions/add-inventory-transaction`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ warehouse_ID, emp_ID, prod_ID, stock_quantity }),
    });

    const responseData = await response.json();
    if (!response.ok) {
      return { success: false, message: responseData.message || "Failed to add inventory transaction" };
    }
    return responseData;
      
  } catch (error) {
    console.error("Error adding inventory transaction:", error);
    return { 
      success: false, 
      message: "Network error: Unable to connect to the server.",
    };
  }
}

export async function markTransactionAsCompleted(transaction_ID) {
  try {
    const response = await fetch(`${API_URL}/transactions/mark-transaction-as-completed`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transaction_ID }),
    });

    console.log(response);
    const responseData = await response.json();
    if (!response.ok) {
      return { success: false, message: responseData.message || "Failed to accept transaction" };
    }
    return responseData;
      
  } catch (error) {
    console.error("Error accepting transaction:", error);
    return { 
      success: false, 
      message: "Network error: Unable to connect to the server.",
    };
  }
}

export async function markTrasactionAsAccepted(transaction_ID) {
  try {
    const response = await fetch(`${API_URL}/transactions/mark-transaction-as-accepted`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transaction_ID }),
    });

    const responseData = await response.json();
    if (!response.ok) {
      return { success: false, message: responseData.message || "Failed to accept transaction" };
    }
    return responseData;
      
  } catch (error) {
    console.error("Error accepting transaction:", error);
    return { 
      success: false, 
      message: "Network error: Unable to connect to the server.",
    };
  }
}