"use client";

import { usePathname } from "next/navigation";
import { SideBar } from "@/components/ui/navbar";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";

    return (
        <div className="w-screen h-screen">
            {isAuthPage ? children : <SideBar>{children}</SideBar>}
        </div>
    );
}
