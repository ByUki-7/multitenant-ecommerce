"use client";

interface ErrorProps {
    msg: string;
    alertIcon: boolean;
    dotAnimation?: boolean;
}

import { LoaderIcon, TriangleAlertIcon } from "lucide-react";

const ErrorPage = ({ msg, alertIcon, dotAnimation }: ErrorProps) => {
    return (
        <div className="px-4 lg:px-12 py-10">
            <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg dark:border-white dark:bg-black">
                { alertIcon ? (<TriangleAlertIcon />) : (<LoaderIcon className="animate-spin text-muted-foreground dark:stroke-white"/>) }
                <p className="text-base font-medium dark:text-white">{msg}
                    {dotAnimation && (
                        <span className="inline-flex">
                            <span className="animate-dot-pulse dark:text-white" style={{ animationDelay: "0s" }}>.</span>
                            <span className="animate-dot-pulse dark:text-white" style={{ animationDelay: "0.2s" }}>.</span>
                            <span className="animate-dot-pulse dark:text-white" style={{ animationDelay: "0.4s" }}>.</span>
                        </span>
                    )}      
                </p>  
            </div>
        </div>
    );
}

export default ErrorPage;