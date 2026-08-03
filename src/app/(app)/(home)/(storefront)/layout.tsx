import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

import { getQueryClient, trpc } from "@/trpc/server";
import { SearchFilters, SearchFiltersSkeleton } from "@/modules/home/ui/components/search-filters";

interface Props {
  children: React.ReactNode;
}

const StorefrontLayout = async ({ children }: Props) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<SearchFiltersSkeleton />}>
        <SearchFilters />
      </Suspense>
      {children}
    </HydrationBoundary>
  );
};

export default StorefrontLayout;
