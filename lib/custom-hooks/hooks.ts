"use client";

import { useRouter } from "next/navigation";
import React from "react";

export function useNavigate() {
    const router = useRouter();

    const navigate = (route: string) => {
        if (!route) {
            console.error("Route is required to navigate.");
            return;
        }
        router.push(route);
    };

    return navigate;
}
