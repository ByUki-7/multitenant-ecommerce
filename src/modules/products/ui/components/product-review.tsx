"use client";

import { useState } from "react";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { DEFAULT_LIMIT } from "@/constants";

interface ProductReviewsProps {
  productId: string;
}

interface ReviewUser {
  name?: string | null;
  image?: { url?: string | null } | null;
}

interface ReviewItemData {
  id: string;
  description: string;
  rating: number;
  user?: ReviewUser | string | null;
}

function ReviewItem({ review }: { review: ReviewItemData }) {
  const [showFull, setShowFull] = useState(false);

  const isLong = review.description.length > DEFAULT_LIMIT;
  const truncated = review.description.slice(0, DEFAULT_LIMIT);

  const user =
    typeof review.user === "object" && review.user !== null
      ? review.user
      : undefined;
  const name = user?.name || "Anonymous";
  const imageUrl = user?.image?.url ?? undefined;

  return (
    <div className="p-4 border border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white dark:bg-zantora-dark dark:border-white dark:shadow-[4px_4px_0px_0px_rgb(200,200,200)]">
      <div className="flex items-center mb-2 gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            className={
              i < review.rating
                ? "w-4 h-4 fill-black text-black dark:fill-white dark:text-white"
                : "w-4 h-4 text-muted-foreground"
            }
          />
        ))}
      </div>

      <p className="text-sm mb-2">
        {showFull || !isLong ? review.description : `${truncated}…`}
        {isLong && !showFull && (
          <button
            type="button"
            className="ml-2 text-zantora-blue underline"
            onClick={() => setShowFull(true)}
          >
            Load more
          </button>
        )}
      </p>

      <div className="flex items-center gap-2 pt-2 border-t border-border mt-2">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={name}
            width={30}
            height={30}
            className="rounded-full size-[30px] object-cover"
          />
        )}
        <span className="text-sm font-medium">{name}</span>
      </div>
    </div>
  );
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const trpc = useTRPC();
  const { data, isLoading } = useQuery(
    trpc.reviews.getMany.queryOptions({ productId })
  );

  if (isLoading) {
    return (
      <p className="text-center text-muted-foreground mt-4">
        Loading reviews...
      </p>
    );
  }

  if (!data?.docs?.length) {
    return (
      <p className="text-center font-medium text-muted-foreground mt-4">
        No reviews yet — be the first to leave one.
      </p>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      {data.docs.map((review) => (
        <ReviewItem key={review.id} review={review as ReviewItemData} />
      ))}
    </div>
  );
}

export default ProductReviews;
