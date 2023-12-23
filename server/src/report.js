import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = express.Router();

import * as yup from "yup";


const StatusEnum = {
  PENDING: "pending",
  APPROVED: "done",
};
const createReportSchema = yup.object().shape({
  userId: yup.number().required(),
  roomId: yup.number().required(),
  detail: yup.string().required(),
});

// Validation schema for the report PUT route
const updateReportSchema = yup.object().shape({
  status: yup.string().oneOf(Object.values(StatusEnum)),
});
 
router.get("/", async (req, res) => {
  try {
    const reports = await prisma.report.findMany({
      include: {
        Room: true,
        User: true,
      },
    });
    res.status(200).json(reports);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/done", async (req, res) => {
  try {
    const report = await prisma.report.findMany({
      where: {
        status: "done",
      },
      include: {
        Room: true,
        User: true,
      },
    });
    res.status(200).json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const report = await prisma.report.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    await createReportSchema.validate(req.body);
    const { userId, roomId, detail } = req.body;
    const report = await prisma.report.create({
      data: {
        userId: userId,
        roomId: roomId,
        detail: detail,
      },
    });
    res.status(200).json({ report });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await prisma.reservation.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    await updateReportSchema.validate(req.body);
    const { id } = req.params;
    const { status } = req.body;
    const report = await prisma.report.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: status ? status : undefined,
      },
    });
    res.status(200).json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const report = await prisma.report.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
