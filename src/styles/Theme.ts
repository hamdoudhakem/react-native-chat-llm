import { Dimensions, StatusBar } from 'react-native';
const { height, width } = Dimensions.get('window');

const COLORS = {
  primary: '#09090b',
  secondary: '#212026',
  tertiary: '#FF7754',
  link: '#0000FF',
  gray: '#83829A',
  gray2: '#C1C0C8',

  offwhite: '#F3F4F8',
  white: '#FFFFFF',
  black: '#000000',
  red: '#e81e4d',
  green: ' #00C135',
  lightWhite: '#FAFAFC',
};

const SIZES = {
  xxSmall: 5,
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 44,
  statusBarHeight: StatusBar.currentHeight,
  height,
  width,
};

const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 7.84,
    elevation: 8,
  },
};

export { COLORS, SIZES, SHADOWS };
