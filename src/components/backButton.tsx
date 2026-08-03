import { Button, Link } from "@payloadcms/ui";
import { ChevronLeft } from "lucide-react";

export const BackButton = () => {
    return (
        <Link href="/">
            <Button>
                <ChevronLeft />
                Back to Home
            </Button>
        </Link>
    );
};