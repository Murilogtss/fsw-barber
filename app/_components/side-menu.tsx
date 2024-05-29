"use client";

import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const SideMenu = () => {
  const { data } = useSession();

  const handleLogoutClick = () => signOut();
  const handleLoginClick = () => signIn("google");

  return (
    <>
      <SheetHeader className="text-left border-b border-solid border-secondary p-5">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      {data?.user ? (
        <div className="flex justify-between px-5 py-6 items-center">
          <div className="flex items-center gap-3 ">
            <Avatar>
              <AvatarImage src={data.user.image ?? ""} />
              <AvatarFallback>{data.user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="font-bold">{data?.user.name}</h2>
          </div>

          <Button variant="secondary" size="icon" onClick={handleLogoutClick}>
            <LogOutIcon />
          </Button>
        </div>
      ) : (
        <div className="px-5 py-6 space-y-3">
          <div className="flex items-center gap-2">
            <UserIcon size={28} />
            <h2 className="font-bold">Olá, faça seu login!</h2>
          </div>
          <Button
            variant="secondary"
            className="w-full justify-start"
            onClick={handleLoginClick}
          >
            <LogInIcon className="mr-2" size={18} />
            Fazer login
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-3 px-5">
        <Button variant="outline" className="justify-start" asChild>
          <Link href="/">
            <HomeIcon size={18} className="mr-2" />
            Início
          </Link>
        </Button>

        {data?.user && (
          <Button variant="outline" className="justify-start" asChild>
            <Link href="/bookings">
              <CalendarIcon size={18} className="mr-2" />
              Agendamentos
            </Link>
          </Button>
        )}
      </div>
    </>
  );
};

export default SideMenu;
