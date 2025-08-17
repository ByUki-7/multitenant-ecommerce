"use client";

import { useParams } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { Categories } from "./categories";
import { SearchInput } from "./search-input";

import { DEFAULT_BG_COLOR } from "@/modules/home/constants";
import { BreadcrumbNavigation } from "./breadcrumb-navigation";
import { Suspense } from "react";
import { LoaderIcon } from "lucide-react";

export const SearchFilters = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

    const params = useParams();
    const categoryParam = params.category as string | undefined;
    const activeCategory = categoryParam || "all";

    const activeCategoryData = data.find((category) => category.slug === activeCategory);

    const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR;
    const activeCategoryName = activeCategoryData?.name || null;

    const activeSubcategory = params.subcategory as string | undefined;
    const activeSubcategoryName = activeCategoryData?.subcategories.find((subcategory) => subcategory.slug === activeSubcategory)?.name || null;

    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center">
                <LoaderIcon className="animate-spin text-muted-foreground"/>
                <p>Loading...</p>
            </div>
        }>
            <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full" style={{ backgroundColor: activeCategoryColor }}>
                <SearchInput />
                <div className="hidden lg:block">
                    <Categories data={data} />
                </div>
                <BreadcrumbNavigation 
                    activeCategoryName={activeCategoryName}
                    activeCategory={activeCategory}
                    activeSubcategoryName={activeSubcategoryName}
                />
            </div>
        </Suspense>
    );
};

export const SearchFiltersSkeleton = () => {
    return (
        <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full" style={{ backgroundColor: "#F5F5F5" }}>
            <SearchInput disabled />
            <div className="hidden lg:block">
                <div className="h-11">

                </div>
            </div>
        </div>
    );
}