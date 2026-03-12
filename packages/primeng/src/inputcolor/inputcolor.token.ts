import { InjectionToken } from '@angular/core';
import type { InputColor } from './inputcolor';
import type { InputColorSlider } from './inputcolor-slider';

export const INPUT_COLOR_INSTANCE = new InjectionToken<InputColor>('INPUT_COLOR_INSTANCE');
export const INPUT_COLOR_SLIDER_INSTANCE = new InjectionToken<InputColorSlider>('INPUT_COLOR_SLIDER_INSTANCE');
