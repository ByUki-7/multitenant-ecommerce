"use client"; 

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CategoriesSidebar } from "./categories-sidebar";

import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useProductFilters } from "@/modules/products/hooks/use-product-filters";

interface Props {
    disabled?: boolean;
};

export const SearchInput = ({
    disabled,
}: Props) => {
    const [filters, setFilters] = useProductFilters();
    const [searchValue, setSearchValue] = useState(filters.search);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const trpc = useTRPC();
    const session = useQuery(trpc.auth.session.queryOptions());

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setFilters({ search: searchValue });
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchValue, setFilters]);

    return (
        <div className="flex items-center gap-2 w-full">
            <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
            <div className="relative w-full">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground dark:text-neutral-800" />
                <Input className="pl-8 placeholder:text-neutral-400 dark:placeholder:!text-neutral-800 dark:border-neutral-800 dark:text-black" placeholder="Search products" disabled={disabled} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            </div>
            {session.data?.user && (
                <Button
                    asChild
                    variant="elevated"
                    className="dark:border-black dark:bg-transparent"
                >
                    <Link prefetch href="/library" className="text-black">
                        <BookmarkCheckIcon className="text-black"/>
                        Library
                    </Link>
                </Button>
            )}
            <Button
                variant="elevated"
                className="size-12 shrink-0 flex lg:hidden dark:bg-transparent dark:border-black"
                onClick={() => setIsSidebarOpen(true)}
            >
                <ListFilterIcon className="dark:text-black" />
            </Button>
        </div>
    );
};