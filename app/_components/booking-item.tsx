import { Booking, Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";

type BookingItemProps = {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
};

const BookingItem = ({ booking }: BookingItemProps) => {
  const isBookingFinished = isPast(booking.date);

  return (
    <Card>
      <CardContent className="p-5 py-0 flex items-center justify-between">
        <div className="flex flex-col gap-2 ">
          <Badge
            variant={isBookingFinished ? "secondary" : "default"}
            className="w-fit"
          >
            {isBookingFinished ? "Finalizado" : "Confirmado"}
          </Badge>

          <h2 className="font-bold">{booking.service.name}</h2>

          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={booking.barbershop.imageUrl} />
              <AvatarFallback>
                {booking.barbershop.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <h3 className="text-sm">{booking.barbershop.name}</h3>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2  border-l border-solid border-secondary py-5 pl-5">
          <p className="text-sm capitalize">
            {format(booking.date, "MMMM", {
              locale: ptBR,
            })}
          </p>
          <p className="text-2xl">{format(booking.date, "dd")}</p>
          <p className="text-sm">{format(booking.date, "HH':'mm")}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
