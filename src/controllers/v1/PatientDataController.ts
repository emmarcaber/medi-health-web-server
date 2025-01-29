import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import PatientData from "../../models/PatientDataModel";

/**
 * Get all patient data with optional filters and pagination
 * @param request Request
 * @param res Response
 */
export const getAllPatientData = async (req: Request, res: Response) => {
  const { page, limit, startDate, endDate } = req.query;

  try {
    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path
      }`;

    const patientData = await PatientData.paginateAndFilter({
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 10,
      startDate: startDate as string,
      endDate: endDate as string,
      filters: {},
      baseUrl,
    });

    res.status(200).json({ success: true, data: patientData });
  } catch (err: any) {
    res.status(500).json({ success: false, data: { message: err.message } });
  }
};

/**
 * Get all patient data for a specific patient with optional filters and pagination
 * @param req
 * @param res
 * @returns json
 */
export const getPatientDataByPatient = async (req: Request, res: Response) => {
  const { patientId } = req.params;
  const { page, limit, startDate, endDate } = req.query;

  try {
    if (!isValidObjectId(patientId)) {
      res
        .status(400)
        .json({ success: false, data: { message: "Invalid patientID" } });

      return;
    }

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path
      }`;
    const patientData = await PatientData.paginateAndFilter({
      page: parseInt(page as string) || 1,
      limit: parseInt(limit as string) || 10,
      startDate: startDate as string,
      endDate: endDate as string,
      filters: { user: patientId },
      baseUrl,
    });

    res.status(200).json({ success: true, data: patientData });
  } catch (err: any) {
    res.status(500).json({ success: false, data: { message: err.message } });
  }
};

/**
 * Get a single patient data entry
 * @param req
 * @param res
 * @returns json
 */
export const getSinglePatientData = async (req: Request, res: Response) => {
  const { patientId, dataId } = req.params;

  try {
    if (!isValidObjectId(patientId) || !isValidObjectId(dataId)) {
      res.status(400).json({
        success: false,
        data: { message: "Invalid patientId or dataID" },
      });

      return;
    }

    const patientData = await PatientData.findOne({
      _id: dataId,
      user: patientId,
    });

    if (!patientData) {
      res
        .status(404)
        .json({ success: false, data: { message: "Patient data not found" } });

      return;
    }

    res.status(200).json({ success: true, data: patientData });
  } catch (err: any) {
    res.status(500).json({ success: false, data: { message: err.message } });
  }
};

/**
 * Create a new patient data entry
 * @param req
 * @param res
 */
export const createPatientData = async (req: Request, res: Response) => {
  const {
    date,
    glassesDrunk,
    stepsTaken,
    exercisesDone,
    medicationsTaken,
    foodsEaten,
  } = req.body;

  try {
    const user = (req as any).user;
    let patientData = await PatientData.findOne({
      user: user._id,
      date
    })

    if (patientData) {
      patientData.glassesDrunk = glassesDrunk;
      patientData.stepsTaken = stepsTaken;
      patientData.exercisesDone = exercisesDone;
      patientData.medicationsTaken = medicationsTaken;
      patientData.foodsEaten = foodsEaten;
      await patientData.save();
      res.status(200).json({ success: true, data: patientData });
      return
    }
    patientData = new PatientData({
      user: user._id,
      date,
      glassesDrunk,
      stepsTaken,
      exercisesDone,
      medicationsTaken,
      foodsEaten,
    });

    await patientData.save();
    res.status(201).json({ success: true, data: patientData });
  } catch (err: any) {
    res.status(500).json({ success: false, data: { message: err.message } });
  }
};

/**
 * Update a specific patient data entry
 * @param req
 * @param res
 * @returns
 */
export const updatePatientData = async (req: Request, res: Response) => {
  const { patientId } = req.params;
  const {
    date,
    glassesDrunk,
    stepsTaken,
    exercisesDone,
    medicationsTaken,
    foodsEaten,
  } = req.body;
  try {
    const user = (req as any).user;

    if (!isValidObjectId(patientId)) {
      res
        .status(400)
        .json({ success: false, data: { message: "Invalid patientID" } });
      return;
    }

    const patientData = await PatientData.findOne({
      _id: patientId,
      user: user._id,
    });

    if (!patientData) {
      res
        .status(404)
        .json({ success: false, data: { message: "Patient data not found" } });
      return;
    }

    patientData.date = date;
    patientData.glassesDrunk = glassesDrunk;
    patientData.stepsTaken = stepsTaken;
    patientData.exercisesDone = exercisesDone;
    patientData.medicationsTaken = medicationsTaken;
    patientData.foodsEaten = foodsEaten;

    await patientData.save();

    res.status(200).json({ success: true, data: patientData });
  } catch (err: any) {
    res.status(500).json({ success: false, data: { message: err.message } });
  }
};

/**
 * Delete a specific patient data entry
 * @param req
 * @param res
 */
export const deletePatientData = async (req: Request, res: Response) => {
  const { patientId } = req.params;
  try {
    const user = (req as any).user;

    if (!isValidObjectId(patientId)) {
      res
        .status(400)
        .json({ success: false, data: { message: "Invalid patientID" } });
      return;
    }

    const patientData = await PatientData.findOne({
      _id: patientId,
      user: user._id,
    });

    if (!patientData) {
      res
        .status(404)
        .json({ success: false, data: { message: "Patient data not found" } });
      return;
    }

    await patientData.deleteOne();
    res.status(204).json({ success: true, data: null });
  } catch (err: any) {
    res.status(500).json({ success: false, data: { message: err.message } });
  }
};
