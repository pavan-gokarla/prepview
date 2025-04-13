"use client";

import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

const Login = () => {
    const router = useRouter();

    const searchParams = useSearchParams();

    useEffect(() => {
        const param = searchParams.get("error");
        if (param) {
            toast.error("User Not Found. Please Sign Up.");
            router.push("/sign-up");
        }
    }, [searchParams, router]);

    return (
        <Suspense fallback={"Loading"}>
            <div className="max-h-screen w-screen bg-[var(--noble--black--700)] flex">
                <div className="h-screen w-screen lg:w-[70vw] py-[20vh] px-[15vw] flex flex-col justify-center items-center">
                    <Form signIn={true} />
                    <div id="go-to" className="mt-6">
                        <p className="text-[var(--noble--black--400)]">
                            Don't have an account?{" "}
                            <Link
                                href="/sign-up"
                                className="cursor-pointer text-[var(--noble--black--100)]"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="h-screen hidden lg:flex w-[50vw]">
                    <Image
                        src="/abstract-03.png"
                        alt="abstract-03"
                        height={1000}
                        width={2400}
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
        </Suspense>
    );
};

export default Login;
