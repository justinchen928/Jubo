const express = require("express");
const router = express.Router();
const { catchErrors } = require("../handlers/error.handle");
const {
  findAllPatients,
  createOrder,
  findAllOrdersByPatientId,
} = require("../controllers/patient.controller");

/**
 * @openapi
 * /patients:
 *  get:
 *    tags:
 *    - Patients
 *    summary: Get all patients
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Patient'
 *        404:
 *          description: Not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.route("/").get(catchErrors(findAllPatients));

/**
 * @openapi
 * /patients/{patientId}/orders:
 *   get:
 *     tags:
 *     - Patients
 *     summary: Get all orders for a specific patient
 *     parameters:
 *       - name: patientId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   post:
 *     tags:
 *     - Patients
 *     summary: Add a new order for a specific patient
 *     parameters:
 *       - name: patientId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 default: "超過120請施打8u"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Order"
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */
router.route("/:patientId/orders").get(catchErrors(findAllOrdersByPatientId));
router.route("/:patientId/orders").post(catchErrors(createOrder));

module.exports = router;
