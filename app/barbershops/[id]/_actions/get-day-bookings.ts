"use server";

import { db } from "@/app/_lib/prisma";
import { endOfDay, startOfDay } from "date-fns";

export const getDayBookings = async (
  serviceId: string,
  barbershopId: string,
  date: Date
) => {
  const bookings = await db.booking.findMany({
    where: {
      barbershopId: barbershopId,
      serviceId: serviceId,
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  });

  return bookings;
};
