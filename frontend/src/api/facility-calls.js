const API_URL = process.env.NEXT_PUBLIC_API_URL;


export async function fetchFacilities(facility_type_query, location_query) {
  try {
    const queryParams = `?facility_type=${encodeURIComponent(facility_type_query)}&location=${encodeURIComponent(location_query)}`;
    
    const response = await fetch(`${API_URL}/facility/fetch-facilities${queryParams}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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

export async function addFacility(facilityType, facilityLocation, facilityCoordinates) {
  console.log(`${API_URL}/facility/add-facility`);

  try {
    const response = await fetch(`${API_URL}/facility/add-facility`, {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ facilityType, facilityLocation, facilityCoordinates }),
    });
    
    const responseData = await response.json();
    if (!response.ok) {
      return { success: false, message: responseData.message || "Failed to add facility" };
    }
    return responseData;
  } catch (error) {
    console.error("Error adding facility:", error);
    return { 
      success: false, 
      message: "Network error: Unable to connect to the server.",
    };
  }
  
}

export async function deleteFacility(facility_ID) {
  try {
    const response = await fetch(`${API_URL}/facility/delete-facility`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({ facility_ID }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      return { success: false, message: responseData.message || "Failed to delete facility" };
    }
    return responseData;
  } catch (error) {
    console.error("Error deleting facility:", error);
    return { 
      success: false, 
      message: "Network error: Unable to connect to the server.",
    };
  }
}