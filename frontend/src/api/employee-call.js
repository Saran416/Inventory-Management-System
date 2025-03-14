const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchEmployeePosition(username) {
  try {
    const response = await fetch(`${API_URL}/employee/employee-position?username=${encodeURIComponent(username)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }, 
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || "Failed to fetch user position" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user data", error);

    return { 
      success: false, 
      message: "Network error: Unable to connect to the server.",
    };

  }
}

export async function employeeExists(username) {
  if (!username) {
    return { success: false, message: "Username is required" };
  }

  try {
    const response = await fetch(`${API_URL}/employee/employee-exists?username=${encodeURIComponent(username)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || "Failed to check employee existence" };
    }

    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { success: false, message: "Network error: Unable to connect to the server." };
  }
}


export async function addAdmin(username, password) {
  try {
    const response = await fetch(`${API_URL}/employee/add-admin`, {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ username, password }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return { success: false, message: responseData.message || "Failed to add admin" };
    }

    return responseData;

  } catch (error) {
    console.error("Error adding user:", error);
    
    return { 
      success: false, 
      message: "Network error: Unable to connect to the server.",
    };

  }
}

export async function addAuditor(username, password) {
  try {
    const response = await fetch(`${API_URL}/employee/add-auditor`, {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ username, password }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return { success: false, message: responseData.message || "Failed to add auditor" };
    }

    return responseData;

  } catch (error) {
    console.error("Error adding user:", error);
    
    return { 
      success: false, 
      message: "Network error: Unable to connect to the server.",
    };
  }
}

export async function addWarehouseManager(username, warehouse, password) {
  try {
    const response = await fetch(`${API_URL}/employee/add-warehouse-manager`, {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ username, warehouse, password }),
    });
    
    const responseData = await response.json();

    if (!response.ok) {
      return { success: false, message: responseData.message || "Failed to add warehouse manager" };
    }

    return responseData;

  } catch (error) {
    console.error("Error adding user:", error);
    
    return { 
      success: false, 
      message: "Network error: Unable to connect to the server.",
    };
  }
}

export async function addWarehouseEmployee(username, warehouse, password) {
  try {
    const response = await fetch(`${API_URL}/employee/add-warehouse-employee`, {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ username, warehouse, password }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return { success: false, message: responseData.message || "Failed to add warehouse employee" };
    }

    return responseData;

  } catch (error) {
    console.error("Error adding user:", error);
    
    return { 
      success: false, 
      message: "Network error: Unable to connect to the server.",
    };
  }
}

export async function addStoreManager(username, store, password) {
  try {
    const response = await fetch(`${API_URL}/employee/add-store-manager`, {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ username, store, password }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return { success: false, message: responseData.message || "Failed to add store manager" };
    }

    return responseData;

  } catch (error) {
    console.error("Error adding user:", error);
    
    return { 
      success: false, 
      message: "Network error: Unable to connect to the server.",
    };
  }
}

export async function addStoreEmployee(username, store, password) {
  try {
    const response = await fetch(`${API_URL}/employee/add-store-employee`, {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ username, store, password }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      return { success: false, message: responseData.message || "Failed to add store employee" };
    }

    return responseData;

  } catch (error) {
    console.error("Error adding user:", error);
    
    return { 
      success: false, 
      message: "Network error: Unable to connect to the server.",
    };
  }
}

export async function addEmployee(username, position, password) {
  try {
    const response = await fetch(`${API_URL}/employee/add-employee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, position, password }),
    });

    console.log("Response Status:", response.status);

    const responseData = await response.json();
    console.log("Response Body:", responseData);

    if (!response.ok) {
      return { success: false, message: responseData.message || "Failed to add employee" };
    }


    return responseData;

  } catch (error) {
    console.error("Error adding user:", error);
    
    return { 
      success: false, 
      message: "Network error: Unable to connect to the server.",
    };

  }
}
