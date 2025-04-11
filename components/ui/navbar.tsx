"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import { getUser } from "@/lib/actions/actions";
import { BadgePlus, BookCheck, BookOpenCheck, FileCode, MessageSquareText } from "lucide-react";

export function SideBar({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    async function fetchUser() {
        try {
            const fetchedUser = await getUser();
            setUser(fetchedUser);
        } catch (error) {
            console.error("Error fetching user:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const links = [
        {
            label: "Create Interview",
            href: "/",
            icon: (
                <BadgePlus className="h-5 w-5 shrink-0 " />

            ),
        },
        {
            label: "My Interviews",
            href: "/my-interviews",
            icon: (

                <BookCheck className="h-5 w-5 shrink-0" />

            ),
        },
        {
            label: "All Interviews",
            href: "/all-interviews",
            icon: (
                <BookOpenCheck className="h-5 w-5 shrink-0 " />
            ),
        },
        {
            label: "FeedBacks",
            href: "/feedbacks",
            icon: (
                <MessageSquareText className="h-5 w-5 shrink-0 " />
            ),
        },
        {
            label: "Logout",
            href: "/",
            icon: (
                <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
    ];

    const [open, setOpen] = useState(false);

    return (
        <div
            className={cn(
                "mx-auto flex w-screen  flex-1 flex-col overflow-hidden  border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
                "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
            )}
        >
            <Sidebar open={open} setOpen={setOpen} animate={true}>
                <SidebarBody className="justify-between gap-13">
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        <Logo open={open} />
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div>
                        {loading ? (
                            <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-neutral-700 animate-pulse"></div>
                        ) : user ? (
                            <SidebarLink
                                link={{
                                    label: user.user?.name || "User",
                                    href: "/",
                                    icon: (
                                        <Image
                                            src={user.user?.image || "/default-avatar.png"}
                                            alt={"User Image"}
                                            width={40}
                                            height={40}
                                            className="h-10 w-10 rounded-full"
                                        />
                                    ),
                                }}
                            />
                        ) : (
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                Not logged in
                            </p>
                        )}
                    </div>
                </SidebarBody>
            </Sidebar>
            <Dashboard >
                <div className="h-screen ">
                    {children}
                </div>
            </Dashboard>
        </div>
    );
}
export const Logo = ({ open }: {
    open: boolean
}) => {
    return (
        <Link
            href="/"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            {/* <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" /> */}
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium whitespace-pre text-black dark:text-white"
            >
                {
                    open ? <h1 className=" text-4xl hidden lg:flex" >PrepView</h1> : <FileCode />
                }
            </motion.span>
        </Link>
    );
};
export const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
        </Link>
    );
};

const Dashboard = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="overflow-y-scroll w-screen bg-[var(--noble--black--600)]" >
            {children}
        </div>
    );
};
