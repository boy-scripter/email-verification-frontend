import { ComponentsDesignTokens } from '@primeuix/themes/types';
import { primitives } from './primitive';

export const Component: ComponentsDesignTokens = {



  inputgroup: {
    addon: {
      background: 'white',
      borderColor: 'white',

    }
  },

  inputtext: {
    root: {
      borderColor: 'white',
      background: 'white',
      hoverBorderColor : 'white',
      color: 'black'
    }
  },



  button: {


    root: {

      borderRadius: primitives.borderRadius.sm,
      label: {
        fontWeight: '600',
      },
      focusRing: {
        offset: '3px',
      },
    },
  },
};
