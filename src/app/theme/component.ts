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
      hoverBorderColor: 'white',
      color: 'black'
    }
  },

  card: {
    
    root: {
      background: 'rgba(255, 255, 255, 0.9)'
      
    }
  },

  select: {
    root : {
      paddingX: '20px',
      paddingY: '10px',
       color: primitives.surface[400],
      borderColor: primitives['surface']['200'],
    },
   
    option: {
      focusBackground : primitives.surface[400],
      selectedFocusBackground : primitives.surface[400],
      color: primitives.surface[400],
     
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
