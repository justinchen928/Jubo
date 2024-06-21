import axios from "axios";

const API_URL = "http://localhost:4000";

export const fetchPatients = async () => {
  try {
    const response = await axios.get(`${API_URL}/patients`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch patients:", error);
    throw error;
  }
};

export const fetchOrders = async (patientId) => {
  try {
    const response = await axios.get(`${API_URL}/patients/${patientId}/orders`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};
