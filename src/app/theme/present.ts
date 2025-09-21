import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { Component } from './component';
import { primitives } from './primitive';
import { semantic } from './semantic';

const ModernRadixPreset = definePreset(Aura, {
  primitive: primitives,
  semantic: semantic,
  components: Component,
});
export { ModernRadixPreset };
