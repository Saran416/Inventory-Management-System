const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchEmployeeID(employee_name) {
  try {
    const response = await fetch(`${API_URL}/employee/get-employee-id?employee_name=${encodeURIComponent(employee_name)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || "Failed to fetch employee ID" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { success: false, message: "Network error: Unable to connect to the server." };
  }
}

export async function fetchEmployeePosition(employee_name) {
  try {
    const response = await fetch(`${API_URL}/employee/employee-position?employee_name=${encodeURIComponent(employee_name)}`, {
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

export async function fetchAllEmployees(employee_name, position, location) {
  try {
    const queryParams = `?employee_name=${encodeURIComponent(employee_name)}&position=${encodeURIComponent(position)}&location=${encodeURIComponent(location)}`

    const response = await fetch(`${API_URL}/employee/fetch-all-employees${queryParams}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    // console.log(response);
    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || "Failed to fetch employees" };
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { success: false, message: "Network error: Unable to connect to the server." };
  }
}

export async function fetchEmployeesByManagerID(manager_ID, employee_name) {
  try {
    const queryParams = `?manager_ID=${manager_ID}&employee_name=${encodeURIComponent(employee_name)}`
    const response = await fetch(`${API_URL}/employee/fetch-employees-by-manager-id${queryParams}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || "Failed to fetch employees" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { success: false, message: "Network error: Unable to connect to the server." };
  }
}

export async function employeeExists(employee_name) {
  if (!employee_name) {
    return { success: false, message: "Username is required" };
  }

  try {
    const response = await fetch(`${API_URL}/employee/employee-exists?employee_name=${encodeURIComponent(employee_name)}`, {
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

export async function addAdmin(employee_name, password) {
  try {
    const response = await fetch(`${API_URL}/employee/add-admin`, {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ employee_name, password }),
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

export async function addAuditor(employee_name, password) {
  try {
    const response = await fetch(`${API_URL}/employee/add-auditor`, {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ employee_name, password }),
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

export async function addWarehouseManager(employee_name, warehouseLocation, password) {
  try {
    const response = await fetch(`${API_URL}/employee/add-warehouse-manager`, {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ employee_name, facility: warehouseLocation, password }),
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

export async function addWarehouseEmployee(employee_name, warehouseLocation, password) {
  try {
    const response = await fetch(`${API_URL}/employee/add-warehouse-employee`, {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ employee_name, facility: warehouseLocation, password }),
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

export async function addStoreManager(employee_name, storeLocation, password) {
  try {
    const response = await fetch(`${API_URL}/employee/add-store-manager`, {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ employee_name, facility: storeLocation, password }),
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

export async function addStoreEmployee(employee_name, storeLocation, password) {
  try {
    const response = await fetch(`${API_URL}/employee/add-store-employee`, {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ employee_name, facility: storeLocation, password }),
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

export async function deleteEmployee(employee_ID) {
  try {
    const response = await fetch(`${API_URL}/employee/delete-employee`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ employee_ID }),
    });

    console.log(response);

    const responseData = await response.json();

    if (!response.ok) {
      return { success: false, message: responseData.message || "Failed to delete employee" };
    }

    return responseData;

  } catch (error) {
    console.error("Error deleting user:", error);
    
    return { 
      success: false, 
      message: "Network error: Unable to connect to the server.",
    };
  }
}

export async function getWorksIn(employee_name) {
  try {
    const response = await fetch(`${API_URL}/employee/get-works-in?employee_name=${encodeURIComponent(employee_name)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || "Failed to fetch works in" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { success: false, message: "Network error: Unable to connect to the server." };
  }
}