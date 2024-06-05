"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

type saveBookingParams = {
  barbershopId: string;
  serviceId: string;
  userId: string;
  date: Date;
};

export const saveBooking = async (params: saveBookingParams) => {
  await db.booking.create({
    data: {
      serviceId: params.serviceId,
      userId: params.userId,
      date: params.date,
      barbershopId: params.barbershopId,
    },
  });

  revalidatePath("/bookings");
};
