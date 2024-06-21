const db = require("../models");
const Patients = db.Patients;
const Orders = db.Orders;
const logger = require("../utils/logger");

exports.findAllPatients = async (req, res) => {
  try {
    const patients = await Patients.findAll();
    res.send(
      patients.map((patient) => {
        return {
          id: patient.id,
          name: patient.name,
        };
      })
    );
  } catch (error) {
    logger.error(error);
    res.status(500).send({
      message: "Error fetching patients",
    });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const order = req.body;
    console.log(order, patientId);
    const newOrder = await Orders.create({
      patient_id: patientId,
      message: order.message,
    });
    res.send({
      id: newOrder.id,
      patient_id: newOrder.patient_id,
      message: newOrder.message,
      last_updated_at: newOrder.formatted_updated_at,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).send({
      message: "Error creating order",
    });
  }
};

exports.findAllOrdersByPatientId = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const orders = await Orders.findAll({
      where: {
        patient_id: patientId,
      },
      order: [["updated_at", "DESC"]],
    });
    res.send(
      orders.map((order) => {
        return {
          id: order.id,
          patient_id: order.patient_id,
          message: order.message,
          last_updated_at: order.formatted_updated_at,
        };
      })
    );
  } catch (error) {
    logger.error(error);
    res.status(500).send({
      message: "Error fetching orders",
    });
  }
};
