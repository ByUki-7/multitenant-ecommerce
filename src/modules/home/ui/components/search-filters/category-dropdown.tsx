"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { CategoriesGetManyOutput } from "@/modules/categories/types";

import { SubcategoryMenu } from "./subcategory-menu";

interface Props {
  category: CategoriesGetManyOutput[1];
  isActive?: boolean;
  isNavigation?: boolean;
  isNavigationHovered?: boolean;
}

export const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onMouseEnter = () => {
    if (category.subcategories?.length > 0) {
      setIsOpen(true);
    }
  };

  const onMouseLeave = () => setIsOpen(false);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <Button
          variant="elevated"
          className={cn(
            "h11 px-4 bg-transparent rounded-full hover:bg-white hover:border-black text-black border transition-colors",
            isActive && !isNavigationHovered
              ? "bg-white border-black border" : "border-transparent",
            isOpen &&
              `bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[4px]`
          )}
        >
          <Link
            href={`/${category.slug === "all" ? "" : category.slug}`}
          >
            {category.name}
          </Link>
        </Button>
        {category.subcategories && category.subcategories.length > 0 && (
          <div
            className={cn(
              `opacity-0 absolute -bottom-3 w-0 h-0
              border-l-[10px] border-r-[10px] border-b-[10px]
              border-l-transparent border-r-transparent border-b-black
              left-1/2 -translate-x-1/2`,
              isOpen && "opacity-100"
            )}
          />
        )}
      </div>
      <SubcategoryMenu
        category={category}
        isOpen={isOpen}
      />
    </div>
  );
};
