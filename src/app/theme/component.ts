import { ComponentsDesignTokens } from "@primeuix/themes/types";
import { primitives } from "./primitive";

export const Component: ComponentsDesignTokens = {
    button: {
        root: {
            borderRadius: primitives.borderRadius.md,
            focusRing : {
                offset: '3px',
            }
        }
    }



}