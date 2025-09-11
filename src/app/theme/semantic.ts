import { primitives } from './primitive';

export const semantic = {

  colorScheme: {
    light: {
      surface: {
        50: primitives.surface[50],
        100: primitives.surface[100],
        200: primitives.surface[200],
        300: primitives.surface[300],
        400: primitives.surface[400],
        500: primitives.surface[500],
        600: primitives.surface[600],
        700: primitives.surface[700],
        800: primitives.surface[800],
        // 900: primitives.surface[900]
      }
    },
    dark: {
       surface: {
          50: primitives.surface[50],
          100: primitives.surface[100],
          200: primitives.surface[200],
          300: primitives.surface[300],
          400: primitives.surface[400],
          500: primitives.surface[500],  
          600: primitives.surface[600],
          700: primitives.surface[700],
          800: primitives.surface[800],
          // 900: primitives.surface[900]
     }
    }
  }
};
