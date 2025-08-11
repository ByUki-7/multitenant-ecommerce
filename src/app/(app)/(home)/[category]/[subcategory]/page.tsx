import { getQueryClient, trpc } from "@/trpc/server";
 
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { SearchParams } from "nuqs/server";
import { loadProductFilters } from "@/modules/products/search-params";
import { DEFAULT_LIMIT } from "@/constants";

interface Props {
    params: Promise<{
        subcategory: string;
    }>;
    searchParams: Promise<SearchParams>;
}

const Page = async ({ params, searchParams }: Props) => {
    const { subcategory } = await params;
    const filters = await loadProductFilters(searchParams);

    console.log(JSON.stringify(filters), "THIS IS FROM RSC")

    const queryClient = getQueryClient();
    void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
        ...filters,
        category: subcategory,
        limit: DEFAULT_LIMIT,
    }));

    return ( 
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView category={subcategory}/>
        </HydrationBoundary>
    );
};

export default Page;