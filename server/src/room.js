import express from "express";
import { PrismaClient } from "@prisma/client";
import * as yup from "yup";
import authenticateToken from "../middleware/auth.js";

const prisma = new PrismaClient();
const router = express.Router();

// Validation schema for the room POST route
const createRoomSchema = yup.object().shape({
  name: yup.string().required(),
  detail: yup.string().required(),
  floor: yup.string().required(),
  description: yup.string().required(),
  totalSeat: yup.string().required(),
});

// Validation schema for the room PATCH route
const updateRoomSchema = yup.object().shape({
  name: yup.string(),
  floor: yup.string(),
  detail: yup.string(),
  description: yup.string(),
  totalSeat: yup.string(),
});

router.get("/", async (req, res) => {
  try {
    const room = await prisma.room.findMany();
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const room = await prisma.room.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        Reservation: true,
      },
    });
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//create
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { name, detail, floor, description, totalSeat } = req.body;
    await createRoomSchema.validate({ name, detail, floor, description, totalSeat });
    const room = await prisma.room.create({
      data: {
        name: name,
        detail: detail,
        floor: floor,
        description: description,
        totalSeat: totalSeat,
      },
    });
    res.status(200).json( room);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
});

//update
router.patch("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, floor, detail, description, totalSeat } = req.body;
    await updateRoomSchema.validate({ name, floor, detail, description, totalSeat });
    const room = await prisma.room.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name ? name : undefined,
        detail: detail ? detail : undefined,
        floor: floor ? floor : undefined,
        description: description ? description : undefined,
        totalSeat: totalSeat ? totalSeat : undefined,
      },
    });
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/update/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const room = await prisma.room.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: status,
      },
    });
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//delete
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const room = await prisma.room.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json(room);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});
export default router;
