import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import { authOptions } from "../_lib/auth";

const BookingsPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");

  const [confirmedBookigs, finishedBookigs] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          gte: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
  ]);

  return (
    <>
      <Header />

      <div className="px-5 py-6">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        <h2 className="text-gray-400 uppercase font-bold text-sm mt-5 mb-3">
          Confirmados
        </h2>
        {!confirmedBookigs.length && (
          <p className="text-sm text-gray-400">
            Você ainda não possuí um agendamento confirmado
          </p>
        )}
        <div className="space-y-3">
          {confirmedBookigs.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

        <h2 className="text-gray-400 uppercase font-bold text-sm mt-5 mb-3">
          Finalizados
        </h2>
        {!finishedBookigs.length && (
          <p className="text-sm text-gray-400">
            Não há agendamentos finalizados
          </p>
        )}

        <div className="space-y-3">
          {finishedBookigs.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BookingsPage;
