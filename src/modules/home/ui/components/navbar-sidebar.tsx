import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { DEFAULT_PUBLIC_URL } from "@/constants";
import { DarkModeButton } from "@/components/dark-mode-button";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

interface NavbarItem {
    href: string,
    children: React.ReactNode;
}

interface Props {
    items: NavbarItem[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const NavbarSidebar = ({
    items,
    open,
    onOpenChange,
 }: Props) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    
    const session = useQuery(trpc.auth.session.queryOptions());
    const user = session.data?.user;
    const isLoading = session.isLoading;
    
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

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="left"
                className="p-0 transition-none"
            >
                <SheetHeader className="p-4 border-b">
                    <div className="flex items-center">
                        <SheetTitle>Menu</SheetTitle>
                    </div>
                </SheetHeader>
                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                            onClick={() => onOpenChange(false)}
                        >
                            {item.children}
                        </Link>
                    ))}
                    
                    <div className="border-t">
                        {!isLoading && user ? (
                            // Boutons pour utilisateur connecté
                            <>
                                <Link 
                                    href="http://zantora.shop/admin/account" 
                                    className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                                    onClick={() => onOpenChange(false)}
                                >
                                    Account
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    disabled={logoutMutation.isPending}
                                    className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center justify-between text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span>
                                        {logoutMutation.isPending ? "Logging out..." : "Log out"}
                                    </span>
                                    <LogOut size={16} />
                                </button>
                            </>
                        ) : (
                            // Boutons pour utilisateur non connecté (ou en cours de chargement)
                            <>
                                <Link 
                                    href={`${DEFAULT_PUBLIC_URL}/sign-in`} 
                                    className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                                    onClick={() => onOpenChange(false)}
                                >
                                    Log in
                                </Link>
                                <Link 
                                    href={`${DEFAULT_PUBLIC_URL}/sign-up`} 
                                    className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                                    onClick={() => onOpenChange(false)}
                                >
                                    Start Selling
                                </Link>
                            </>
                        )}
                    </div>
                </ScrollArea>
                <div className="p-4 flex justify-end">
                    <DarkModeButton />
                </div>
            </SheetContent>
        </Sheet>
    )
};