"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { AccountDropdownMenu } from "./account-dropdown-menu";
import { cn } from "@/lib/utils";

export const AccountDropdown = () => {
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  const username = session.data?.user?.username;
  const tenant = session.data?.user?.tenants?.[0]?.tenant;
  const tenantImage =
    typeof tenant === "object" && tenant !== null && "image" in tenant
      ? (tenant.image as { url?: string })?.url
      : undefined;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const onMouseEnter = () => setIsOpen(true);
  const onMouseLeave = () => setTimeout(() => setIsOpen(false), 100);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <button className="flex items-center gap-2 border-none underline">
          {tenantImage && (
            <Image
              src={tenantImage}
              alt="Tenant image"
              width={32}
              height={32}
              className="rounded-full border shrink-0 size-[16px] dark:border-white"
            />
          )}
          {username}
        </button>
        <div
            className={cn(
              `opacity-0 absolute -bottom-3 w-0 h-0
              border-l-[10px] border-r-[10px] border-b-[10px]
              border-l-transparent border-r-transparent border-b-black
              left-1/2 -translate-x-1/2 text-black dark:text-white dark:border-b-white`,
              isOpen && "opacity-100"
            )}
          />
      </div>
      <AccountDropdownMenu isOpen={isOpen}  tenantId={typeof tenant === "object" && tenant !== null && "id" in tenant ? tenant.id : undefined} />
    </div>
  );
};
