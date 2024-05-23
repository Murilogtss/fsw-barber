import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <Card className="rounded-none">
      <CardContent className="justify-between p-5 flex flex-row items-center">
        <Image src="/logo.png" alt="FSW Barber" height={22} width={120} />
        <Button size="icon" variant="outline" className="h-8 w-8">
          <MenuIcon size={18} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Header;
