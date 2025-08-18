import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { ProductList, ProductListSkeleton } from "../components/product-list";
import { Suspense } from "react";
import { DarkModeButton } from "@/components/dark-mode-button";

export const LibrartView = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-zantora-dark">
            <nav className="p-4 bg-[#F4F4F0] w-full border-b flex items-cente dark:bg-neutral-900">
                <Link prefetch href="/" className="flex items-center gap-2">
                    <ArrowLeftIcon className="size-4"/>
                    <span className="text font-medium dark:text-white">Continue shopping</span>
                </Link>
                <DarkModeButton className="ml-auto mr-2"/>
            </nav>
            <header className="bg-[#F4F4F0] py-8 border-b dark:bg-neutral-900">
                <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 flex flex-col gap-y-4">
                    <h1 className="text-[40px] font-medium dark:text-white">Library</h1>
                    <p className="font-medium dark:text-white">
                        Your purchases and reviews
                    </p>
                </div>
            </header>
            <section className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-10">
                <Suspense fallback={<ProductListSkeleton />}>
                    <ProductList />
                </Suspense>
            </section>
        </div>
    )
};