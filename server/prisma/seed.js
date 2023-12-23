import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // create users
  const user1 = await prisma.user.create({
    data: {
      email: 'tinz@gmail.com',
      studentId: '64070152',
      password: '12345678',
      firstName: 'Tinz',
      lastName: 'Tinz',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'tun@gmail.com',
      studentId: '64070100',
      password: '12345678',
      firstName: 'Tun',
      lastName: 'Kwai',
    },
  });

  // create rooms
  const room1 = await prisma.room.create({
    data: {
      name: 'Room A',
      floor: '1',
      detail: 'Small meeting room',
      description: 'A small meeting room for up to 6 people',
      totalSeat: '6',
    },
  });

  const room2 = await prisma.room.create({
    data: {
      name: 'Room B',
      floor: '2',
      detail: 'Large conference room',
      description: 'A large conference room for up to 20 people',
      totalSeat: '20',
    },
  });

  // create reservations
  const reservation1 = await prisma.reservation.create({
    data: {
      userId: user1.id,
      roomId: room1.id,
      dateTimeStart: new Date('2023-04-24T10:00:00Z'),
      dateTimeEnd: new Date('2023-04-24T11:00:00Z'),
      detail: 'Weekly team meeting',
      status: 'approved',
    },
  });

  const reservation2 = await prisma.reservation.create({
    data: {
      userId: user2.id,
      roomId: room2.id,
      dateTimeStart: new Date('2023-04-25T14:00:00Z'),
      dateTimeEnd: new Date('2023-04-25T16:00:00Z'),
      detail: 'Client presentation',
      status: 'pending',
    },
  });

  // create reports
  const report1 = await prisma.report.create({
    data: {
      userId: user1.studentId,
      roomId: room1.id,
      detail: 'The projector is not working',
      status: 'pending',
    },
  });

  const report2 = await prisma.report.create({
    data: {
      userId: user2.studentId,
      roomId: room2.id,
      detail: 'The AC is too cold',
      status: 'done',
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
