const db = require("../models");
const Patients = db.Patients;
const logger = require("../utils/logger");
const patientController = require("../controllers/patient.controller");

jest.mock("../models");
jest.mock("../utils/logger");

describe("Patient Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  describe("findAllPatients", () => {
    it("should return all patients", async () => {
      const patients = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Doe" },
      ];
      Patients.findAll.mockResolvedValue(patients);

      await patientController.findAllPatients(req, res);

      expect(Patients.findAll).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith(
        patients.map((patient) => ({
          id: patient.id,
          name: patient.name,
        }))
      );
    });

    it("should return 500 if an error occurs", async () => {
      const error = new Error("Test error");
      Patients.findAll.mockRejectedValue(error);

      await patientController.findAllPatients(req, res);

      expect(logger.error).toHaveBeenCalledWith(error);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        message: "Error fetching patients",
      });
    });
  });
});
