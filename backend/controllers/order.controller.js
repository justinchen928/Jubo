const db = require("../models");
const Orders = db.Orders;
const logger = require("../utils/logger");

exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Orders.findByPk(orderId);

    if (!order) {
      return res.status(404).send({
        message: "Order not found",
      });
    }

    // should check is owner of order

    res.send({
      id: order.id,
      patientId: order.patient_id,
      message: order.message,
      last_updated_at: order.formatted_updated_at,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).send({
      message: "Error fetching orders",
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { message } = req.body;
    const order = await Orders.findByPk(orderId);

    if (!order) {
      return res.status(404).send({
        message: "Order not found",
      });
    }

    // should check is owner of order

    const newOrder = await order.update({ message });
    res.send({
      id: newOrder.id,
      patientId: newOrder.patient_id,
      message: newOrder.message,
      last_updated_at: order.formatted_updated_at,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).send({
      message: "Error updating order",
    });
  }
};
