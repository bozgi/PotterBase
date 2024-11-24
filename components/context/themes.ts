export const themeColors = {
    gryffindor: {
      light: {
        background: '#F1C6B5',
        text: '#7A1D1D',
        primary: '#9C2A2B',
        secondary: '#F1A2A1',
      },
      dark: {
        background: '#5C2A29',
        text: '#F1C6B5',
        primary: '#9C2A2B',
        secondary: '#F1A2A1',
      }
    },
    hufflepuff: {
      light: {
        background: '#F8E71C',
        text: '#8C6E0D',
        primary: '#F2C80F',
        secondary: '#F8C200',
      },
      dark: {
        background: '#8C6E0D',
        text: '#F8E71C',
        primary: '#F2C80F',
        secondary: '#F8C200',
      }
    },
    ravenclaw: {
      light: {
        background: '#A0A6D1',
        text: '#0A2F5A',
        primary: '#1A4888',
        secondary: '#406D96',
      },
      dark: {
        background: '#0A2F5A',
        text: '#A0A6D1',
        primary: '#1A4888',
        secondary: '#406D96',
      }
    },
    slytherin: {
      light: {
        background: '#2C6E49',
        text: '#9B8A6D',
        primary: '#2A4732',
        secondary: '#5A7F5A',
      },
      dark: {
        background: '#2A4732',
        text: '#9B8A6D',
        primary: '#2C6E49',
        secondary: '#5A7F5A',
      }
    }
  };

  export type House = keyof typeof themeColors;
  
  export const getThemeColors = (house: House, mode: 'light' | 'dark') => {
    return themeColors[house]?.[mode] || themeColors['gryffindor'].light;
  };
  