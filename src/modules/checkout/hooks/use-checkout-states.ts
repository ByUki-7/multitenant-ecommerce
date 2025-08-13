import { parseAsBoolean, useQueryStates } from "nuqs";

export const useCheckoutStates = () => {
    return useQueryStates({
        sucess: parseAsBoolean.withDefault(false).withOptions({
            clearOnDefault: true,
        }),
        cancel: parseAsBoolean.withDefault(false).withOptions({
            clearOnDefault: true,
        }),
    });
};