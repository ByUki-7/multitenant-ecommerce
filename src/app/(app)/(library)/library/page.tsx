import { DEFAULT_LIMIT } from "@/constants";
import { LibrartView } from "@/modules/library/ui/views/library-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const dynamic = "force-dynamic";

const Page = () => {
    const queryClient = getQueryClient();
    void queryClient.prefetchInfiniteQuery(trpc.library.getMany.infiniteQueryOptions({
        limit: DEFAULT_LIMIT,
    }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <LibrartView />
        </HydrationBoundary>
    );
}
 
export default Page;