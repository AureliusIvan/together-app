"use client"

import React from "react";
import {cn} from "@/lib/utils";
import {BottomMenu} from "@/components/custom-ui/bottom-menu";
import {TopMenu} from "@/components/custom-ui/top-menu";
import {SocketProvider} from "@/contexts/SocketContext";

export default function Layout({children}: { children: React.ReactNode }) {
  return (
      <SocketProvider>
        <section
            className={cn(`bg-black`)}
        >

          <TopMenu/>
          {children}
          <BottomMenu/>
        </section>
      </SocketProvider>
  );
}