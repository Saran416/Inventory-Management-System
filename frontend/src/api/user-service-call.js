export async function fetchEmployeePosition(username) {
  try {
    const response = await fetch(`http://localhost:8080/api/user/user-position/${username}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user position");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user data", error);
    return null;
  }
}

export async function addEmployee(username, position, password) {

}
  