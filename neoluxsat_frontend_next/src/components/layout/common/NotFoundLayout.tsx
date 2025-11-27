"use client";

import { useEffect } from "react";
import Header from "./Header";

const NotFoundLayout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Force full page reload for all link clicks on the not-found page
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link && link.href && link.href.startsWith(window.location.origin)) {
        e.preventDefault();
        window.location.href = link.href;
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-[16px] md:mx-[30px] w-auto">
        <div className="mx-auto w-full max-w-[1380px] pt-[110px]">
          {children}
        </div>
      </main>
    </div>
  );
};

export default NotFoundLayout;
