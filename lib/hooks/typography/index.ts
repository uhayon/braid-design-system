import { useContext } from 'react';
import clsx from 'clsx';
import type { StyleRule } from '@vanilla-extract/css';

import { useDefaultTextProps } from '../../components/private/defaultTextProps';
import TextLinkRendererContext from '../../components/TextLinkRenderer/TextLinkRendererContext';
import { vars } from '../../themes/vars.css';
import { responsiveStyle } from '../../css/responsiveStyle';
import * as styles from './typography.css';

type TextTone = keyof typeof styles.tone;

export interface UseTextProps {
  weight?: keyof typeof styles.fontWeight;
  size?: keyof typeof styles.text;
  tone?: TextTone;
  baseline: boolean;
}

export const globalTextStyle = ({
  weight = 'regular',
  size = 'standard',
}: Pick<UseTextProps, 'weight' | 'size'> = {}): StyleRule => ({
  fontFamily: vars.fontFamily,
  fontWeight: vars.textWeight[weight],
  color: vars.foregroundColor.neutral,
  ...responsiveStyle({
    mobile: {
      fontSize: vars.textSize[size].mobile.fontSize,
      lineHeight: vars.textSize[size].mobile.lineHeight,
    },
    tablet: {
      fontSize: vars.textSize[size].tablet.fontSize,
      lineHeight: vars.textSize[size].tablet.lineHeight,
    },
  }),
});

export function useText({
  weight = 'regular',
  size = 'standard',
  tone = 'neutral',
  baseline,
}: UseTextProps) {
  const textTone = useTextTone({ tone });

  return clsx(
    styles.fontFamily,
    textTone,
    styles.fontWeight[weight],
    baseline ? styles.text[size].trimmed : styles.text[size].untrimmed,
  );
}

export type HeadingLevel = keyof typeof styles.heading;
export type HeadingWeight = 'regular' | 'weak';

interface UseHeadingProps {
  weight?: HeadingWeight;
  level: HeadingLevel;
  baseline: boolean;
}

export const globalHeadingStyle = ({
  weight = 'regular',
  level,
}: Pick<UseHeadingProps, 'weight' | 'level'>): StyleRule => ({
  fontFamily: vars.fontFamily,
  fontWeight: vars.headingWeight[weight],
  color: vars.foregroundColor.neutral,
  ...responsiveStyle({
    mobile: {
      fontSize: vars.headingLevel[level].mobile.fontSize,
      lineHeight: vars.headingLevel[level].mobile.lineHeight,
    },
    tablet: {
      fontSize: vars.headingLevel[level].tablet.fontSize,
      lineHeight: vars.headingLevel[level].tablet.lineHeight,
    },
  }),
});

export function useHeading({
  weight = 'regular',
  level,
  baseline,
}: UseHeadingProps) {
  const textTone = useTextTone({ tone: 'neutral' });

  return clsx(
    styles.fontFamily,
    styles.headingWeight[weight],
    baseline ? styles.heading[level].trimmed : styles.heading[level].untrimmed,
    textTone,
  );
}

export function textSize(size: keyof typeof styles.text) {
  return styles.text[size].untrimmed;
}

export function useWeight(weight: keyof typeof styles.fontWeight) {
  const inTextLinkRenderer = useContext(TextLinkRendererContext);

  return inTextLinkRenderer ? undefined : styles.fontWeight[weight];
}

export function useTextTone({ tone: toneProp }: { tone: TextTone }) {
  const textLinkContext = useContext(TextLinkRendererContext);
  const { tone } = useDefaultTextProps({ tone: toneProp });

  if (tone === 'neutral' && textLinkContext && textLinkContext !== 'weak') {
    return styles.link;
  }

  return styles.tone[tone];
}

export const touchableText = styles.touchable;
