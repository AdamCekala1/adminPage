import { BREAKPOINT } from '@angular/flex-layout';

import { CONSTANTS } from '../../../shared/constants';
import { widtBreakpoints } from '../../../shared/enums/width-breakpoints.enum';

const BREAKPOINTS = [
  {
    alias: 'xs',
    suffix: 'Xs',
    mediaQuery: `(max-width: ${ CONSTANTS.WIDTH_BREAKPOINTS[widtBreakpoints.sm] - 1 }px)`,
    overlapping: false
  }, {
    alias: 'sm',
    suffix: 'Sm',
    mediaQuery: `(min-width: ${ CONSTANTS.WIDTH_BREAKPOINTS[widtBreakpoints.sm] }px)
      and (max-width: ${ CONSTANTS.WIDTH_BREAKPOINTS[widtBreakpoints.md] - 1}px)`,
    overlapping: false
  }, {
    alias: 'md',
    suffix: 'Md',
    mediaQuery: `(min-width: ${ CONSTANTS.WIDTH_BREAKPOINTS[widtBreakpoints.md] }px)
      and (max-width: ${ CONSTANTS.WIDTH_BREAKPOINTS[widtBreakpoints.lg] - 1}px)`,
    overlapping: false
  }, {
    alias: 'lg',
    suffix: 'Lg',
    mediaQuery: `(min-width: ${ CONSTANTS.WIDTH_BREAKPOINTS[widtBreakpoints.lg] }px)
      and (max-width: ${ CONSTANTS.WIDTH_BREAKPOINTS[widtBreakpoints.xl] - 1}px)`,
    overlapping: false
  }, {
    alias: 'xl',
    suffix: 'Xl',
    mediaQuery: `(min-width: ${ CONSTANTS.WIDTH_BREAKPOINTS[widtBreakpoints.xl] }px)`,
    overlapping: false
  }
];

export const CustomBreakPointsProvider = {
  provide: BREAKPOINT,
  useValue: BREAKPOINTS,
  multi: true
};


