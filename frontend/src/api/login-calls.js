const API_URL = process.env.NEXT_PUBLIC_API_URL;


export async function validateLogin(employee_name, password) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employee_name, password: password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || "Login failed" };
    }

    return await response.json();
  } catch (error) {
    console.error("Error validating login:", error);
    return { 
      success: false, 
      message: "Network error: Unable to connect to the server. Please check your internet connection."
    };

  }
}


