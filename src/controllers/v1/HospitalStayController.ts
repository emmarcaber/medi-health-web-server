import { isValidObjectId } from "mongoose";
import HospitalStay from "../../models/HospitalStayModel";
import { Request, Response } from "express";

/**
 * Get a single hospital stay entry
 * @param req
 * @param res
 */
export const getSingleHospitalStay = async (req: Request, res: Response) => {
  try {
    if (!isValidObjectId(req.params.hospitalStayId)) {
      res
        .status(400)
        .json({ success: false, data: { message: "Invalid hospitalStayID" } });
      return;
    }

    const hospitalStay = await HospitalStay.findById(req.params.hospitalStayId);

    if (!hospitalStay) {
      res.status(404).json({ success: false, data: {} });
      return;
    }

    res.status(200).json({ success: true, data: hospitalStay });
  } catch (error: any) {
    res.status(400).json({ success: false, data: { message: error.message } });
  }
};

/**
 * Get all hospital stay entries
 * @param req
 * @param res
 */
export const getAllHospitalStays = async (req: Request, res: Response) => {
  try {
    const hospitalStays = await HospitalStay.find();

    res.status(200).json({ success: true, data: hospitalStays });
  } catch (error: any) {
    res.status(400).json({ success: false, data: { message: error.message } });
  }
};

/**
 * Get all hospital stay entries by patient
 * @param req
 * @param res
 */
export const getHospitalStaysByPatient = async (
  req: Request,
  res: Response
) => {
  try {
    if (!isValidObjectId(req.params.patientId)) {
      res
        .status(400)
        .json({ success: false, data: { message: "Invalid patientID" } });
      return;
    }

    const hospitalStays = await HospitalStay.find({
      patient: req.params.patientId,
    });

    res.status(200).json({ success: true, data: hospitalStays });
  } catch (error: any) {
    res.status(400).json({ success: false, data: { message: error.message } });
  }
};

/**
 * Create a new hospital stay entry
 * @param req
 * @param res
 */
export const createHospitalStay = async (req: Request, res: Response) => {
  try {
    const hospitalStay = new HospitalStay(req.body);
    await hospitalStay.save();

    res.status(201).json({ success: true, data: hospitalStay });
  } catch (error: any) {
    res.status(400).json({ success: false, data: { message: error.message } });
  }
};

/**
 * Update a hospital stay entry
 * @param req
 * @param res
 */
export const updateHospitalStay = async (req: Request, res: Response) => {
  try {
    if (!isValidObjectId(req.params.hospitalStayId)) {
      res
        .status(400)
        .json({ success: false, data: { message: "Invalid hospitalStayID" } });
      return;
    }

    const hospitalStay = await HospitalStay.findByIdAndUpdate(
      req.params.hospitalStayId,
      req.body,
      { new: true }
    );

    if (!hospitalStay) {
      res.status(404).json({ success: false, data: {} });
      return;
    }

    res.status(200).json({ success: true, data: hospitalStay });
  } catch (error: any) {
    res.status(400).json({ success: false, data: { message: error.message } });
  }
};

/**
 * Delete a hospital stay entry
 * @param req
 * @param res
 */
export const deleteHospitalStay = async (req: Request, res: Response) => {
  try {
    if (!isValidObjectId(req.params.hospitalStayId)) {
      res
        .status(400)
        .json({ success: false, data: { message: "Invalid hospitalStayID" } });
      return;
    }

    const hospitalStay = await HospitalStay.findByIdAndDelete(
      req.params.hospitalStayId
    );

    if (!hospitalStay) {
      res.status(404).json({ success: false, data: {} });
      return;
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(400).json({ success: false, data: { message: error.message } });
  }
};
