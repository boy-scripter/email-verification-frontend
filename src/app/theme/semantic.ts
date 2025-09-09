import { primitives } from "./primitive";

const semantic = {
    // Primary colors
    'primary.color': primitives.blue[500],
    'primary.hover': primitives.blue[600],
    'primary.active': primitives.blue[700],
    'primary.background': primitives.blue[50],

    // Surface / cards
    'surface.background': primitives.gray[50],
    'surface.hover': primitives.gray[100],

    // Roundedness
    'button.radius': primitives.borderRadius.sm,
    'card.radius': primitives.borderRadius.lg,
    'dialog.radius': primitives.borderRadius.lg
};
export { semantic };