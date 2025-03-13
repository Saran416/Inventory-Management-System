export async function validateLogin(username, password) {
  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username, password: password }),
    });

    if (!response.ok) {
      throw new Error("Failed to validate login");
    }

    return await response.json();
  } catch (error) {
    console.error("Error validating login", error);
    return null;
  }
}


