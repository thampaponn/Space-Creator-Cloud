import express from "express";
import { PrismaClient } from "@prisma/client";
import * as yup from "yup";

const prisma = new PrismaClient();
const router = express.Router();

// Validation schema for the reservation POST route
const StatusEnum = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

const createReservationSchema = yup.object().shape({
  userId: yup.number().required(),
  roomId: yup.number().required(),
  dateTimeStart: yup.date().required('Start time is required!'),
  dateTimeEnd: yup.date().required('End time is required'),
  detail: yup.string(),
});

// Validation schema for the reservation PUT route
const updateReservationSchema = yup.object().shape({
  status: yup.string().oneOf(Object.values(StatusEnum)),
});

router.get("/", async (req, res) => {
  try {
    const reservation = await prisma.reservation.findMany({
      include: {
        Room: true,
        User: true,
      },
    });
    res.status(200).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/admin", async (req, res) => {
  const { status } = req.query;
  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        status: status,
      },
      include: {
        Room: true,
        User: true,
      },
    });
    res.status(200).json(reservations);
  } catch (error) {
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
    const { id } = req.params;
    const { status } = req.body;
    await updateReservationSchema.validate({ status });

    const reservation = await prisma.reservation.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found." });
    }

    // If the reservation is already approved, return an error
    if (reservation.status === StatusEnum.APPROVED) {
      return res
        .status(400)
        .json({ error: "The reservation has already been approved." });
    }

    const updatedReservation = await prisma.reservation.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: status,
      },
    });

    if (status === StatusEnum.APPROVED) {
      // Automatically reject overlapping reservations
      await prisma.reservation.updateMany({
        where: {
          roomId: reservation.roomId,
          id: { not: parseInt(id) },
          dateTimeStart: {
            lte: new Date(reservation.dateTimeEnd),
          },
          dateTimeEnd: {
            gte: new Date(reservation.dateTimeStart),
          },
        },
        data: {
          status: StatusEnum.REJECTED,
        },
      });
    }

    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post("/", async (req, res) => {
  try {
    const { userId, roomId, dateTimeStart, dateTimeEnd, detail } = req.body;
    await createReservationSchema.validate({
      userId,
      roomId,
      dateTimeStart,
      dateTimeEnd,
      detail,
    });

    // Check for overlapping reservations
    const overlappingReservations = await prisma.reservation.findMany({
      where: {
        roomId: roomId,
        status: StatusEnum.APPROVED,
        dateTimeStart: {
          lte: new Date(dateTimeEnd),
        },
        dateTimeEnd: {
          gte: new Date(dateTimeStart),
        },
      },
    });

    // If there are overlapping approved reservations, return an error
    if (overlappingReservations.length > 0) {
      return res
        .status(400)
        .json({ error: "The requested time is unavailable." });
    }

    const reservation = await prisma.reservation.create({
      data: {
        userId: userId,
        roomId: roomId,
        dateTimeStart: dateTimeStart,
        dateTimeEnd: dateTimeEnd,
        detail: detail || "",
        status: StatusEnum.PENDING,
      },
    });
    res.status(200).json({ reservation });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
