"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import UserButton from "../components/UserButtton";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import Logo from "./Logo";

interface MyButtonProps {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  href?: string;
}
const MyButton: React.ForwardRefRenderFunction<
  HTMLAnchorElement,
  MyButtonProps
> = ({ onClick, href }, ref) => {
  return (
    <a
      href={href}
      onClick={onClick}
      ref={ref}
      className="font-medium text-md text-white bg-primary hover:bg-secondary transition-colors duration-300 ease-in-out py-3 px-2 rounded-lg"
    >
      Reservar
    </a>
  );
};
const ForwardedMyButton = React.forwardRef(MyButton);

export default function MainNav() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <div className="hidden md:flex max-w-6xl mx-auto">
      <nav className="flex justify-between">
        {/* Logo */}
        <div className="flex-initial">
          <Link href="/" className="flex items-start px-3 mt-2">
            <Logo />
          </Link>
        </div>
        {/* Links */}
        <div className="flex items-center justify-between space-x-1">
          <div className="py-5 px-3">
            <Link
              href="/usecases"
              className="font-medium text-xl text-slate-800 hover:text-400 transition-colors
              duration-300 ease-in-out"
            >
              Casos de uso
            </Link>
          </div>

          <div className="py-5 px-3">
            <Link
              href="/menu"
              className="font-medium text-xl text-slate-800 hover:text-400 transition-colors
              duration-300 ease-in-out"
            >
              Menu
            </Link>
          </div>
          <div className="py-5 px-3">
            <Link
              href="/nosotros"
              className="font-medium text-xl text-slate-800 hover:text-400 transition-colors
              duration-300 ease-in-out"
            >
              Nosotros
            </Link>
          </div>
          <div className="py-5 px-3">
            <Link
              href="/huerta"
              className="font-medium text-xl text-slate-800 hover:text-400 transition-colors
              duration-300 ease-in-out"
            >
              Huerta
            </Link>
          </div>
          <div className="py-5 px-3">
            <Link
              href="/eventos"
              className="font-medium text-xl text-slate-800 hover:text-400 transition-colors
              duration-300 ease-in-out"
            >
              Eventos
            </Link>
          </div>
          <div className="py-5 px-3">
            <Link
              href="/bonos"
              className="font-medium text-xl text-slate-800 hover:text-400 transition-colors
              duration-300 ease-in-out"
            >
              Bonos de regalo
            </Link>
          </div>
          <div className="py-5 px-3">
            <Link href={`/reservar`} passHref legacyBehavior>
              <ForwardedMyButton />
            </Link>
          </div>
          <div className="py-5 px-3">
            {user && <UserButton user={user} />}
            {!user && session.status !== "loading" && <SignInButton />}
          </div>
        </div>
      </nav>
    </div>
  );
}
function SignInButton() {
  return <Button onClick={() => signIn()}>Iniciar sesión</Button>;
}
