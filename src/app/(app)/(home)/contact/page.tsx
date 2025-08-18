import { getQueryClient, trpc } from "@/trpc/server";
 
import type { SearchParams } from "nuqs/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { loadProductFilters } from "@/modules/products/search-params";
import { DEFAULT_LIMIT } from "@/constants";
import ErrorPage from "../../(tenants)/tenants/[slug]/(home)/products/[productId]/error";

interface Props {
    params: Promise<{
        category: string;
    }>;
    searchParams: Promise<SearchParams>;
}

export const dynamic = "force-dynamic";

const Page = async ({ params, searchParams }: Props) => {
    const { category } = await params;
    const filters = await loadProductFilters(searchParams);


    const queryClient = getQueryClient();
    void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
        ...filters,
        category,
        limit: DEFAULT_LIMIT,
    }));

    return ( 
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ErrorPage msg="The devs are loading the magic" dotAnimation alertIcon={false}/>
        </HydrationBoundary>
    );
};
 
export default Page;