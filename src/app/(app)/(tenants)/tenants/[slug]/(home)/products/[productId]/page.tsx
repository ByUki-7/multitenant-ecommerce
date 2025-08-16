import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";

import { ProductView } from "@/modules/products/ui/views/product-view";
import { Suspense } from "react";
import { LoaderIcon } from "lucide-react";

interface Props {
    params: Promise<{ productId: string; slug: string }>;
};

export const dynamic = "force-dynamic";

const Page = async ({ params }: Props) => {
    const { productId, slug } = await params;

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.tenants.getOne.queryOptions({
        slug,
    }));

    return ( 
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={
                    <div className="flex min-h-screen items-center justify-center">
                        <LoaderIcon className="animate-spin text-muted-foreground"/>
                    </div>
                }>
                <ProductView productId={productId} tenantSlug={slug} />
            </Suspense>
        </HydrationBoundary>
     );
}
 
export default Page;