"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import { Separator } from "./ui/separator";
import { Instagram, Linkedin, Facebook } from "lucide-react";

import Logo from "./Logo";
import { Button } from "./ui/button";

const footerLinks = [
  {
    title: "Menu",
    href: "/menu",
  },
  {
    title: "Nosotros",
    href: "/nosotros",
  },
  {
    title: "Huerta",
    href: "/huerta",
  },
  {
    title: "Eventos",
    href: "/eventos",
  },
  {
    title: "Política de Privacidad",
    href: "#",
  },
];

const Footer = () => {
  const pathname = usePathname(); // Initialize usePathname
  const isAdminPage = pathname.startsWith("/admin"); // Check if the current route is an admin page

  if (isAdminPage) {
    return null; // Do not render the footer on admin pages
  }

  return (
    <div className=" flex flex-col bg-primary border-t">
      <footer>
        <div className="max-w-screen-xl mx-auto">
          <div className="py-12 flex flex-col sm:flex-row items-start justify-between gap-x-8 gap-y-10 px-6 xl:px-0">
            <div>
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <Logo />
              </Link>
              <ul className="mt-6 flex items-center gap-4 flex-wrap">
                {footerLinks.map(({ title, href }) => (
                  <li key={title}>
                    <Link
                      href={href}
                      className="text-slate-200 hover:text-slate-300"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Subscribe Newsletter */}
            <div>
              <p className="text-2xl text-center text-slate-200">
                Suscríbete a nuestra newsletter!
              </p>
            </div>
            <div className="max-w-xs w-full">
              <h6 className="font-semibold text-slate-200 mb-2">
                Recibe información útil sobre como adoptar la Inteligencia
                artificial en tu negocio
              </h6>
              <Button className="bg-secondary">¡Suscribirme!</Button>
            </div>
          </div>
          <Separator />
          <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
            {/* Copyright */}
            <span className="text-slate-200">
              &copy; {new Date().getFullYear()}{" "}
              <Link href="/" target="_blank">
                Gastroteca
              </Link>
              . Todos los derechos reservados.
            </span>
            <div className="flex items-center gap-5 text-primary">
              <Link href="#" target="_blank">
                <Instagram className="h-5 w-5 hover:text-secondary" />
              </Link>
              <Link href="#" target="_blank">
                <Linkedin className="h-5 w-5 hover:text-secondary" />
              </Link>
              <Link href="#" target="_blank">
                <Facebook className="h-5 w-5 hover:text-secondary" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
