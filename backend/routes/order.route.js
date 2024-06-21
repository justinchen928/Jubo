const express = require("express");
const router = express.Router();
const { catchErrors } = require("../handlers/error.handle");
const {
  getOrderById,
  updateOrder,
} = require("../controllers/order.controller");

/**
 * @openapi
 * /orders/{orderId}:
 *  get:
 *    tags:
 *    - Orders
 *    summary: Get a specific order
 *    parameters:
 *      - name: orderId
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Order"
 *      404:
 *        description: Not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Error"
 *
 *  put:
 *    tags:
 *    - Orders
 *    summary: Update a specific order
 *    parameters:
 *      - name: orderId
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                default: "超過120請施打8u"
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Order"
 *      404:
 *        description: Not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Error"
 */
router.route("/:orderId").get(catchErrors(getOrderById));
router.route("/:orderId").put(catchErrors(updateOrder));

module.exports = router;
