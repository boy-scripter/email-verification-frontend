import Aura from '@primeuix/themes/aura';
import { primitives } from './primitive';
import { semantic } from './semantic';
import { Component } from './component';
import { definePreset } from '@primeuix/themes';

const ModernRadixPreset = definePreset(Aura, {
  components: Component,
  primitive: primitives,
  semantic: semantic,
});
export { ModernRadixPreset };