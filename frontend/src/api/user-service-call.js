export async function fetchEmployeePosition(username) {
  try {
    const response = await fetch(`http://localhost:8080/api/employee/user-position?username=${username}`);
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
    const response = await fetch(`http://localhost:8080/api/employee/employee-exists?username=${encodeURIComponent(username)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
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

export async function addEmployee(username, position, password) {
  try {
    console.log("Sending request to backend...");

    const response = await fetch(`http://localhost:8080/api/employee/add-employee`, {
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
