import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const sunset = definePartsStyle({
  dialog: {
    bg: 'linear-gradient(90deg, #2A6571 0%, #C15553 100%)',
  },
});

export const modalTheme = defineMultiStyleConfig({
  variants: { sunset },
});