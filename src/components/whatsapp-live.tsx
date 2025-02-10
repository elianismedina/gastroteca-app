"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useEffect } from "react";

const WhatsappLive = () => {
  const whatsappNumber = "3126728516";
  const baseUrl = "https://api.whatsapp.com/send/";
  const youtubeLink = "https://www.youtube.com/@elianismedina";
  const encodedMessage = `Hello, check out my YouTube channel: ${youtubeLink}`;
  const whatsappLink = `${baseUrl}?phone=${whatsappNumber}&text=${encodedMessage}&type=phone_number&app_absent=0`;

  useEffect(() => {
    const handleScroll = () => {
      const whatsappLinkElement = document.querySelector(".whatsapp-link");
      if (window.scrollY > 100) {
        whatsappLinkElement?.classList.add("visible");
      } else {
        whatsappLinkElement?.classList.remove("visible");
      }
    };
    const checkScrollVisibility = () => {
      const whatsappLinkElement = document.querySelector(".whatsapp-link");
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollHeight > clientHeight) {
        handleScroll();
        window.addEventListener("scroll", handleScroll);
      } else {
        whatsappLinkElement?.classList.add("visible");
      }
    };
    checkScrollVisibility();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <Link
        href={whatsappLink}
        className="whatsapp-link relative"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="absolute left-[7px] top-[7px] -z-50 size-10">
          <span className="flex size-full items-center justify-center animate-ping rounded-full bg-green-500 opacity-75"></span>
        </span>
        <Image
          src="/images/whatsapp.png"
          alt="whatsapp"
          width={40}
          height={40}
          className="whatsapp-icon z-50"
        />
      </Link>
    </div>
  );
};

export default WhatsappLive;
