import React from "react";
import {cn} from "@/lib/utils";
import {BottomMenu} from "@/components/custom-ui/bottom-menu";
import {TopMenu} from "@/components/custom-ui/top-menu";

export default function Layout({children}: { children: React.ReactNode }) {
  return (
      <section
          className={cn(`bg-black`)}
      >
        <TopMenu/>
        {children}
        <BottomMenu/>
      </section>
  );
}