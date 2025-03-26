const API_URL = process.env.NEXT_PUBLIC_API_URL;


export async function fetchAllFacilities() {
  try {
    const response = await fetch(`${API_URL}/facility/fetch-all-facilities`, {
      method: "GET",
    });


    const responseData = await response.json();

    if (!response.ok) {
      return { success: false, message: responseData.message || "Failed to fetch facilities" };
    }

    return responseData;

  } catch (error) {
    console.error("Error fetching facilities:", error);
    
    return { 
      success: false, 
      message: "Network error: Unable to connect to the server.",
    };

  }
}

export async function fetchWarehouseLocations() {
  try {
    const response = await fetch(`${API_URL}/facility/fetch-warehouse-locations`, {
      method: "GET",
    });


    const responseData = await response.json();

    if (!response.ok) {
      return { success: false, message: responseData.message || "Failed to fetch warehouse facilities" };
    }

    return responseData;
  
  } catch (error) {
    console.error("Error fetching warehouse facilities:", error);
    
    return { 
      success: false, 
      message: "Network error: Unable to connect to the server.",
    };
  }
}


export async function fetchStoreLocations() {
  try {
    const response = await fetch(`${API_URL}/facility/fetch-store-locations`, {
      method: "GET",
    });


    const responseData = await response.json();

    if (!response.ok) {
      return { success: false, message: responseData.message || "Failed to fetch store facilities" };
    }

    return responseData;
  
  } catch (error) {
    console.error("Error fetching store facilities:", error);
    
    return { 
      success: false, 
      message: "Network error: Unable to connect to the server.",
    };
  }
}