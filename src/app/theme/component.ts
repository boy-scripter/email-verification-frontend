import { ComponentsDesignTokens } from '@primeuix/themes/types';
import { primitives } from './primitive';

export const Component: ComponentsDesignTokens = {
  inputgroup: {
    addon: {
      background: 'white',
      borderColor: 'white',
    },
  },

  inputtext: {
    root: {
      borderColor: 'white',
      background: 'white',
      hoverBorderColor: 'white',
      color: 'black',
      disabledBackground: 'white',
    },
  },

  card: {
    root: {
      background: 'rgba(255, 255, 255, 0.9)',
    },
  },

  menu: {
    item: {
      borderRadius: primitives.borderRadius.md,
      focusBackground: primitives.surface[400],
    },
  },

  select: {
    root: {
      paddingX: '20px',
      paddingY: '10px',
      color: primitives.surface[400],
      borderColor: primitives['surface']['200'],
    },

    option: {
      focusBackground: primitives.surface[400],
      selectedFocusBackground: primitives.surface[400],
      color: primitives.surface[400],
    },
  },

 
  button: {
    root: {
      warn : {
        background: 'red',
          color : '#fff',
      },

      borderRadius: primitives.borderRadius.sm,
      label: {
        fontWeight: '500',
      },

      focusRing: {
        offset: '3px',
      },
    },
  },


  progressbar: {
    root: {
      borderRadius: primitives.borderRadius.xs,
      background: primitives.surface[200],
    },
    value: {
      background: 'repeating-linear-gradient(45deg, skyblue, skyblue 10px, #2196F3 10px, #2196F3 20px)',
    },
  },
};
