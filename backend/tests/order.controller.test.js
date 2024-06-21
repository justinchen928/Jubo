const db = require("../models");
const Orders = db.Orders;
const logger = require("../utils/logger");
const orderController = require("../controllers/order.controller");

jest.mock("../models");
jest.mock("../utils/logger");

describe("Order Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { orderId: 1 },
      body: { message: "New message" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  describe("getOrderById", () => {
    it("should return order if found", async () => {
      const order = {
        id: 1,
        patient_id: 2,
        message: "Test message",
        formatted_updated_at: "2020-01-01 00:00:00",
      };
      Orders.findByPk.mockResolvedValue(order);

      await orderController.getOrderById(req, res);

      expect(Orders.findByPk).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith({
        id: order.id,
        patientId: order.patient_id,
        message: order.message,
        last_updated_at: order.formatted_updated_at,
      });
    });

    it("should return 404 if order not found", async () => {
      Orders.findByPk.mockResolvedValue(null);

      await orderController.getOrderById(req, res);

      expect(Orders.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        message: "Order not found",
      });
    });

    it("should return 500 if an error occurs", async () => {
      const error = new Error("Test error");
      Orders.findByPk.mockRejectedValue(error);

      await orderController.getOrderById(req, res);

      expect(logger.error).toHaveBeenCalledWith(error);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        message: "Error fetching orders",
      });
    });
  });

  describe("updateOrder", () => {
    it("should update order if found", async () => {
      const order = {
        id: 1,
        patient_id: 2,
        message: "Old message",
        update: jest
          .fn()
          .mockResolvedValue({ id: 1, patient_id: 2, message: "New message" }),
      };
      Orders.findByPk.mockResolvedValue(order);

      await orderController.updateOrder(req, res);

      expect(Orders.findByPk).toHaveBeenCalledWith(1);
      expect(order.update).toHaveBeenCalledWith({ message: "New message" });
      expect(res.send).toHaveBeenCalledWith({
        id: 1,
        patientId: 2,
        message: "New message",
      });
    });

    it("should return 404 if order not found", async () => {
      Orders.findByPk.mockResolvedValue(null);

      await orderController.updateOrder(req, res);

      expect(Orders.findByPk).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        message: "Order not found",
      });
    });

    it("should return 500 if an error occurs", async () => {
      const error = new Error("Test error");
      Orders.findByPk.mockRejectedValue(error);

      await orderController.updateOrder(req, res);

      expect(logger.error).toHaveBeenCalledWith(error);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        message: "Error updating order",
      });
    });
  });
});
