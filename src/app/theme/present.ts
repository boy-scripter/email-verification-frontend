import Aura from '@primeuix/themes/aura';
import { primitives } from './primitive';
import { semantic } from './semantic';
import { definePreset } from '@primeuix/themes';

const ModernRadixPreset = definePreset(Aura, {
    primitives,
    semantic,
});

export { ModernRadixPreset };