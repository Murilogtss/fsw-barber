"use client";

import { Button } from "@/app/_components/ui/button";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type BarbershopInfoProps = {
  barbershop: Barbershop;
};

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Button
          onClick={handleBackClick}
          size="icon"
          variant="outline"
          className="z-30 absolute top-4 left-4"
        >
          <ChevronLeftIcon />
        </Button>

        <Button
          size="icon"
          variant="outline"
          className="z-30 absolute top-4 right-4"
        >
          <MenuIcon />
        </Button>
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="object-cover opacity-75"
        />
      </div>

      <div className="px-5 pt-3 pb-6 space-y-2 border-b border-solid border-secondary">
        <h1 className="font-bold text-xl">{barbershop.name}</h1>
        <div className="flex items-center gap-2">
          <MapPinIcon className="text-primary" size={16} />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="flex items-center gap-2">
          <StarIcon className="text-primary" size={16} />
          <p className="text-sm">5.0 (200 Avaliações)</p>
        </div>
      </div>
    </div>
  );
};

export default BarbershopInfo;
