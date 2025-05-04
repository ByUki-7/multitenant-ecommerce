"use client";

import { useRef, useState } from "react";

import { Category } from "@/payload-types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { SubcategoryMenu } from "./subcategory-menu";
import { useDropdownPosition } from "./use-dropdown-position";

interface Props {
    category: Category
    isActive?: boolean
    isNavigation?: boolean
    isNavigationHovered?: boolean
};

export const CategoryDropdown = ({
    category,
    isActive,
    isNavigation,
    isNavigationHovered
}: Props) => {
    console.log("Category in CategoryDropdown:", category)

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { getDropdownPosition } = useDropdownPosition(dropdownRef); 

    const onMouseEnter = () => {
        if (category.subcategories?.docs?.length > 0) {
            setIsOpen(true)
        }
    };

    const onMouseLeave = () => setIsOpen(false);

    const DropdownPosition = getDropdownPosition();

    return (
        <div className="relative" ref={dropdownRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div className="relative">
                <Button variant="elevated" className={cn(
                    "h11 px-4 bg-transparent rounded-full hover:bg-white hover:border-black text-black border transition-colors",
                    isActive && !isNavigationHovered ? "bg-white border-none" : "border-transparent"
                )}>
                    {category.name}
                </Button>
                {category.subcategories?.docs?.length > 0 && (
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
                position={DropdownPosition}

            />
        </div>
    );
};