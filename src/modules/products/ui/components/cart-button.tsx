import { Button } from "@/components/ui/button";
import { DEFAULT_PUBLIC_URL } from "@/constants";
import { cn } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import Link from "next/link";

interface Props {
    tenantSlug: string;
    productId: string;
    isPurchased?: boolean;
};

export const CartButton = ({ tenantSlug, productId, isPurchased }: Props) => {
    const cart = useCart(tenantSlug);

    if (isPurchased) {
        return (
            <Button
                variant="elevated"
                asChild
                className="flex-1 font-medium bg-white dark:bg-zantora-dark"
            >
                <Link prefetch href={`${DEFAULT_PUBLIC_URL}/library`}>
                    View in Library
                </Link>
            </Button>
        )
    }

    return (
        <Button
            variant="elevated"
            className={cn("flex-1 bg-zantora-blue dark:border-white", cart.isProductInCart(productId) && "bg-white dark:bg-zantora-dark")}
            onClick={() => cart.toggleProduct(productId)}
        >
            {cart.isProductInCart(productId) 
                ? "Remove from cart"
                : "Add to cart"
            }
        </Button>
    )
}