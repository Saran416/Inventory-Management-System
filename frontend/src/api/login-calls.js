export async function validateLogin(username, password) {
  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
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


