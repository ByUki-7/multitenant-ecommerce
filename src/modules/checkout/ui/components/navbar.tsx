import { DarkModeButton } from "@/components/dark-mode-button";
import { Button } from "@/components/ui/button";
import { generateTenantURL } from "@/lib/utils";

import Link from "next/link";

interface Props {
    slug: string;
};

export const Navbar = ({ slug }: Props) => {
    return (
        <nav className="h-20 border-b font-medium bg-white dark:bg-black">
            <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
                <p className="text-xl">Checkout</p>
                <div className="ml-auto m-4">
                    <DarkModeButton />
                </div> 
                <Button
                    variant="elevated"
                    asChild
                    className="dark:bg-zantora-dark"
                >
                    <Link href={generateTenantURL(slug)}>
                        Continue Shopping
                    </Link>
                </Button>
            </div>
        </nav>
    );
};

