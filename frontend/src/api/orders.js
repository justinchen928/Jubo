import axios from "axios";

const API_URL = "http://localhost:4000";

export const newOrder = async (patientId, message) => {
  try {
    const response = await axios.post(
      `${API_URL}/patients/${patientId}/orders`,
      { message }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to save order:", error.message);
    throw error;
  }
};

export const updateOrder = async (orderId, message) => {
  try {
    const response = await axios.put(`${API_URL}/orders/${orderId}`, {
      message,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to save order:", error.message);
    throw error;
  }
};

export const fetchOrder = async (orderId) => {
  try {
    const response = await axios.get(`${API_URL}/orders/${orderId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Failed to get order:", error.message);
    throw error;
  }
};
