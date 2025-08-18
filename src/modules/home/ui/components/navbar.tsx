"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { NavbarSidebar } from "./navbar-sidebar";

import { useState } from "react";
import { MenuIcon } from "lucide-react";

import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_PUBLIC_URL } from "@/constants";
import { DarkModeButton } from "@/components/dark-mode-button";
import { AccountDropdown } from "./account-dropdown";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});

interface NavbarItemProps {
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
}

const NavbarItem = ({
    href,
    children,
    isActive,
}: NavbarItemProps) => {
    return (
        <Button
            asChild
            variant="outline"
            className={cn(
                "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
                "dark:text-foreground dark:hover:border-primary",
                isActive && "bg-black text-white hover:bg-black hover:text-white dark:bg-white dark:text-black dark:hover:bg-white dark:hover:text-black"
            )}
        >
            <Link href={href}>
                { children }
            </Link>
        </Button>
    );
};

const navbarItems = [
    { href : "/", children: "Home" },
    { href : "/about", children: "About" },
    { href : "/features", children: "Features" },
    { href : "/pricing", children: "Pricing" },
    { href : "/contact", children: "Contact" },
];

export const Navbar = () => {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const trpc = useTRPC();
    const session = useQuery(trpc.auth.session.queryOptions());

    return (
        <nav className="h-20 flex border-b justify-between font-medium bg-background border-border">
            <Link href="/" className="pl-6 flex items-center">
                <span className={cn("text-5xl font-semibold select-none text-foreground", poppins.className)}>
                    zantora
                </span>
            </Link>

            <NavbarSidebar
                items={navbarItems}
                open={isSidebarOpen}
                onOpenChange={setIsSidebarOpen}
            />

            <div className="items-center gap-4 hidden lg:flex">
                {navbarItems.map((item) => (
                    <NavbarItem
                        key={item.href}
                        href={item.href}
                        isActive={pathname === item.href}
                    >
                        {item.children}
                    </NavbarItem>
                ))}
                <DarkModeButton />
            </div>

            {session.data?.user ? (
                <div className="hidden lg:flex">
                    <div className="m-7">
                        <AccountDropdown />
                    </div>
                     <Button
                        asChild
                        className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black !text-white hover:bg-zantora-blue hover:!text-black transition-colors text-large border-border dark:bg-white dark:!text-black dark:hover:bg-zantora-blue dark:hover:text-white"
                    >
                        <Link href="/admin">
                            Dashboard
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="hidden lg:flex">
                    <Button
                        asChild
                        variant="secondary"
                        className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-secondary text-secondary-foreground hover:bg-zantora-blue hover:text-background transition-colors text-large border-border"
                    >
                        <Link prefetch href={`${DEFAULT_PUBLIC_URL}/sign-in`}>
                            Log in
                        </Link>
                    </Button>
                    <Button
                        asChild
                        className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black !text-white hover:bg-zantora-blue hover:!text-black transition-colors text-large border-border dark:bg-white dark:!text-black dark:hover:bg-zantora-blue dark:hover:text-white"
                    >
                        <Link prefetch href={`${DEFAULT_PUBLIC_URL}/sign-up`}>
                            Start selling
                        </Link>
                    </Button>
                 </div>
            )}

            <div className="flex lg:hidden items-center justify-center">
                <Button
                    variant="ghost"
                    className="size-12 border-transparent bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <MenuIcon /> 
                </Button>
            </div>
        </nav>
    );
};