import { InjectionToken } from '@angular/core';

export type DemoMode = 'default' | 'collapsible';
export const DEMO_MODE = new InjectionToken<DemoMode>('DEMO_MODE');
export const IN_DEMO_WRAPPER = new InjectionToken<boolean>('IN_DEMO_WRAPPER');
