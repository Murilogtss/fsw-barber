import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type BarbershopItemProps = {
  barbershop: Barbershop;
};

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-0">
        <div className="px-1 relative h-[159px] w-full">
          <Badge
            className="absolute top-2 left-2 z-40 flex items-center gap-1 opacity-90"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <span className="text-xs">5.0</span>
          </Badge>
          <Image
            className="rounded-2xl object-cover rounded-b-none"
            fill
            src={barbershop.imageUrl}
            alt={barbershop.name}
          />
        </div>

        <div className="px-3 pb-3">
          <h2 className="font-bold mt-2 truncate">{barbershop.name}</h2>
          <p className="text-sm text-gray-400 truncate">{barbershop.address}</p>
          <Button className="w-full mt-3" variant="secondary" asChild>
            <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;
