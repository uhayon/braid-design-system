import { style } from '@mattsjones/css-core';
import { calc } from '@mattsjones/css-utils';
import { themeVars } from '../../themes/themeVars.css';

export const button = style({});

export const focusRing = style({
  top: calc.negate(themeVars.space.xsmall),
  bottom: calc.negate(themeVars.space.xsmall),
  left: calc.negate(themeVars.space.xxsmall),
  right: calc.negate(themeVars.space.xxsmall),
  selectors: {
    [`${button}:focus ~ &`]: {
      opacity: 1,
    },
  },
});
