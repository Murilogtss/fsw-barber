"use client";

import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";
import { cancelBooking } from "../_actions/cancel-booking";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleCancelBookingOnClick = async () => {
    if (isBookingFinished) return;
    try {
      setIsLoading(true);
      await cancelBooking(booking.id);
      toast.success("Reserva cancelada com sucesso!");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSheetOpen(false);
      setIsLoading(false);
    }
  };

  return (
    <Sheet onOpenChange={setIsSheetOpen} open={isSheetOpen}>
      <SheetTrigger asChild>
        <Card className="min-w-[320px]">
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
      </SheetTrigger>

      <SheetContent className="p-0">
        <SheetHeader className="text-left border-b border-solid border-secondary p-5">
          <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="px-5">
          <div className="relative h-[180px] w-full mt-5">
            <Image
              src="/barbershop-map.png"
              fill
              className="object-contain"
              alt={booking.barbershop.name}
            />

            <Card className="absolute bottom-4 left-4 right-4">
              <CardContent className="p-3 flex gap-2">
                <Avatar>
                  <AvatarImage src={booking.barbershop.imageUrl} />
                </Avatar>

                <div>
                  <h2 className="font-bold">{booking.barbershop.name}</h2>
                  <h3 className="text-xs truncate font-light">
                    {booking.barbershop.address}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </div>

          <Badge
            variant={isBookingFinished ? "secondary" : "default"}
            className="w-fit my-3"
          >
            {isBookingFinished ? "Finalizado" : "Confirmado"}
          </Badge>

          <Card>
            <CardContent className="p-3 space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="font-bold">{booking.service.name}</h2>
                <h3 className="font-bold text-sm">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </h3>
              </div>

              <div className="flex justify-between items-center">
                <h3 className="text-gray-400 text-sm">Data</h3>
                <h4 className="text-sm">
                  {format(booking.date, "dd 'de' MMMM", {
                    locale: ptBR,
                  })}
                </h4>
              </div>

              <div className="flex justify-between items-center">
                <h3 className="text-gray-400 text-sm">Horário</h3>
                <h4 className="text-sm">{format(booking.date, "HH:mm")}</h4>
              </div>

              <div className="flex justify-between items-center">
                <h3 className="text-gray-400 text-sm">Barbearia</h3>
                <h4 className="text-sm">{booking.service.name}</h4>
              </div>
            </CardContent>
          </Card>
        </div>

        <SheetFooter className="flex-row px-5 py-3 gap-3">
          <SheetClose asChild>
            <Button className="w-full" variant="secondary">
              Voltar
            </Button>
          </SheetClose>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="w-full"
                variant="destructive"
                disabled={isBookingFinished || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Carregando...
                  </>
                ) : (
                  "Cancelar Reserva"
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[90%]">
              <AlertDialogTitle>
                Realmente deseja cancelar sua reserva?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Uma vez cancelada, não será possível reverter essa ação.
              </AlertDialogDescription>
              <AlertDialogFooter className="flex-row items-center gap-3">
                <AlertDialogCancel className="w-full mt-0">
                  Voltar
                </AlertDialogCancel>
                <AlertDialogAction
                  className="w-full"
                  onClick={handleCancelBookingOnClick}
                  disabled={isBookingFinished || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                      Carregando...
                    </>
                  ) : (
                    "Confirmar"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
