import { redirect } from "next/navigation";
import BarbershopItem from "../(home)/_components/barbershop-item";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import Search from "../(home)/_components/search";

type BarberShopPageProps = {
  searchParams: {
    search?: string;
  };
};

const BarberShopPage = async ({ searchParams }: BarberShopPageProps) => {
  if (!searchParams.search) {
    redirect("/");
  }
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
  });

  return (
    <>
      <Header />

      <div className="py-6 px-5 flex flex-col gap-6">
        <Search />
        <h1 className="text-xs text-gray-400 font-bold uppercase">
          {barbershops.length
            ? `Resultados para: ${searchParams.search}`
            : `Não há resultados para: ${searchParams.search}`}
        </h1>

        <div className="grid grid-cols-2 mt-3 gap-4">
          {barbershops.map((barbershop) => (
            <div key={barbershop.id} className="w-full">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BarberShopPage;
