import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchPatients, fetchOrders } from "../api/patients";
import { newOrder, updateOrder, fetchOrder } from "../api/orders";

const PatientContext = createContext();

export const usePatientContext = () => {
  return useContext(PatientContext);
};

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderMessage, setOrderMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

  useEffect(() => {
    const getPatients = async () => {
      try {
        const patientsData = await fetchPatients();
        setPatients(patientsData);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    };
    getPatients();
  }, []);

  const handleViewClick = async (patient) => {
    try {
      const ordersData = await fetchOrders(patient.id);
      setSelectedPatient(patient);
      setOrders(ordersData);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedPatient(null);
    setOrders([]);
  };

  const handleOrderDialogClose = () => {
    setIsOrderDialogOpen(false);
    setSelectedOrder(null);
    setOrderMessage("");
  };

  const handleOrderChange = (event) => {
    setOrderMessage(event.target.value);
  };

  const handleSaveOrder = async () => {
    try {
      const orderData = selectedOrder
        ? await updateOrder(selectedOrder.id, orderMessage)
        : await newOrder(selectedPatient.id, orderMessage);

      setOrders((prev) =>
        selectedOrder
          ? prev.map((order) => (order.id === orderData.id ? orderData : order))
          : [...prev, orderData]
      );

      setOrders([orderData, ...orders]);
      handleOrderDialogClose();
    } catch (error) {
      console.error("Failed to save order:", error);
    }
  };

  const handleAddOrderClick = () => {
    setSelectedOrder(null);
    setOrderMessage("");
    setIsOrderDialogOpen(true);
  };

  const handleOrderItemClick = async (order) => {
    try {
      const response = await fetchOrder(order.id);
      console.log(response);
      setSelectedOrder(response);

      setOrderMessage(response.message);
      setIsOrderDialogOpen(true);
    } catch (error) {
      console.error("Failed to fetch order:", error);
    }
  };

  return (
    <PatientContext.Provider
      value={{
        patients,
        orders,
        selectedPatient,
        selectedOrder,
        orderMessage,
        isDialogOpen,
        isOrderDialogOpen,
        handleViewClick,
        handleDialogClose,
        handleOrderDialogClose,
        handleOrderChange,
        handleSaveOrder,
        handleAddOrderClick,
        handleOrderItemClick,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};
