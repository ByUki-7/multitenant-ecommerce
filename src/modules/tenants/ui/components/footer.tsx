import Link from "next/link"
import { Poppins } from "next/font/google"

import { cn } from "@/lib/utils"

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});

export const Footer = () => {
    return (
        <footer className="border-t font-medium bg-white dark:bg-zantora-dark">
            <div className="max-w-(--breakpoint-xl) mx-auto flex items-center gap-2 py-6 h-full px-4 lg:px-12">
                <p className="dark:text-white">Powered by</p>
                <Link href={process.env.NEXT_PUBLIC_APP_URL!}>
                    <span className={cn("text-2xl font semibold dark:text-white", poppins.className)}>
                        zantora
                    </span>
                </Link>
            </div>
        </footer>
    );
};