import Link from "next/link";
import { ChevronRight, LogOut } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
    isOpen: boolean;
    tenantId?: string;
}

export const AccountDropdownMenu = ({
    isOpen,
    tenantId,
}: Props) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    
    const logoutMutation = useMutation(trpc.auth.logout.mutationOptions({
        onSuccess: async () => {
            // Vider complètement le cache React Query
            queryClient.clear();
            
            // Invalider spécifiquement les queries d'auth
            await queryClient.invalidateQueries({ 
                queryKey: ['auth'] 
            });
            
            // Forcer un refresh de la page pour vider tous les états
            window.location.href = "/sign-in";
            
            toast?.success?.("Logout succeeded");
        },
        onError: (error) => {
            console.error("Logout error:", error);
            toast?.error?.("Error while trying to log out");
        },
    }));

    const handleLogout = async () => {
        try {
            await logoutMutation.mutateAsync();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (!isOpen) return null;
    
    return (
        <div
            className="absolute z-100"
            style={{
                top: "100%",
                left: 0,
            }}
        >
            {/* Invisible Bridge to maintain Hover */}
            <div className="h-3 w-60" />
            <div
                className="w-60 text-!black rounded-md overflow-hidden border dark:border-white shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_rgb(200,200,200)] -translate-x-[2px] -translate-y-[2px] bg-white dark:bg-zantora-dark"
            >
                <div>
                    <Link
                        href="http://zantora.shop/admin/account"
                        className="w-full text-left p-4 flex justify-between items-center font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        Account 
                        <ChevronRight size={16} />
                    </Link>
                    <Link
                        href={tenantId ? `http://zantora.shop/admin/collections/tenants/${tenantId}` : "/"}
                        className="w-full text-left p-4 flex justify-between items-center font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        Your shop
                        <ChevronRight size={16} />
                    </Link>
                    <button
                        onClick={handleLogout}
                        disabled={logoutMutation.isPending}
                        className="w-full text-left p-4 flex justify-between items-center font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {logoutMutation.isPending ? "Loggin out..." : "Log out"}
                        <LogOut size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}