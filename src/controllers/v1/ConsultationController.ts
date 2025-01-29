import { isValidObjectId } from "mongoose";
import Consultation from "../../models/ConsultationModel";
import { Request, Response } from "express";

/**
 * Get all consultation entries
 * @param req
 * @param res
 */
export const getConsultations = async (req: Request, res: Response) => {
  try {
    const consultations = await Consultation.find();
    res.status(200).json({ success: true, data: consultations });
  } catch (error: any) {
    res.status(500).json({ success: false, data: { message: error.message } });
  }
};

/**
 * Get a single consultation entry
 * @param req
 * @param res
 */
export const getSingleConsultation = async (req: Request, res: Response) => {
  try {
    if (!isValidObjectId(req.params.consultationId)) {
      res
        .status(400)
        .json({ success: false, data: { message: "Invalid consulationId" } });
      return;
    }

    const consultation = await Consultation.findById(req.params.consultationId);

    if (!consultation) {
      res.status(404).json({ success: false, data: {} });
      return;
    }

    res.status(200).json({ success: true, data: consultation });
  } catch (error: any) {
    res.status(400).json({ success: false, data: { message: error.message } });
  }
};

/**
 * Get all consultation entries by patient
 * @param req
 * @param res
 */
export const getConsultationsByPatient = async (
  req: Request,
  res: Response
) => {
  try {
    if (!isValidObjectId(req.params.patientId)) {
      res
        .status(400)
        .json({ success: false, data: { message: "Invalid patientId" } });
      return;
    }

    const consultations = await Consultation.find({
      patient: req.params.patientId,
    });

    res.status(200).json({ success: true, data: consultations });
  } catch (error: any) {
    res.status(500).json({ success: false, data: { message: error.message } });
  }
};

/**
 * Get all consultation entries by doctor
 * @param req
 * @param res
 */
export const getConsultationsByDoctor = async (req: Request, res: Response) => {
  try {
    if (!isValidObjectId(req.params.doctorId)) {
      res
        .status(400)
        .json({ success: false, data: { message: "Invalid doctorId" } });
      return;
    }

    const consultations = await Consultation.find({
      doctor: req.params.doctorId,
    });

    res.status(200).json({ success: true, data: consultations });
  } catch (error: any) {
    res.status(500).json({ success: false, data: { message: error.message } });
  }
};

/**
 * Create a new consultation entry
 * @param req
 * @param res
 */
export const createConsultation = async (req: Request, res: Response) => {
  try {
    const consultation = new Consultation(req.body);
    await consultation.save();

    res.status(201).json({ success: true, data: consultation });
  } catch (error: any) {
    res.status(400).json({ success: false, data: { message: error.message } });
  }
};

/**
 * Update a consultation entry
 * @param req
 * @param res
 */
export const updateConsultation = async (req: Request, res: Response) => {
  try {
    if (!isValidObjectId(req.params.consultationId)) {
      res
        .status(400)
        .json({ success: false, data: { message: "Invalid consultationId" } });
      return;
    }

    const consultation = await Consultation.findByIdAndUpdate(
      req.params.consultationId,
      req.body,
      { new: true }
    );

    if (!consultation) {
      res.status(404).json({ success: false, data: {} });
      return;
    }

    res.status(200).json({ success: true, data: consultation });
  } catch (error: any) {
    res.status(400).json({ success: false, data: { message: error.message } });
  }
};

/**
 * Delete a consultation entry
 * @param req
 * @param res
 */
export const deleteConsultation = async (req: Request, res: Response) => {
  try {
    if (!isValidObjectId(req.params.consultationId)) {
      res
        .status(400)
        .json({ success: false, data: { message: "Invalid consultationId" } });
      return;
    }

    const consultation = await Consultation.findByIdAndDelete(
      req.params.consultationId
    );

    if (!consultation) {
      res.status(404).json({ success: false, data: {} });
      return;
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(400).json({ success: false, data: { message: error.message } });
  }
};
