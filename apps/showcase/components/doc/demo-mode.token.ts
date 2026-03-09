import { InjectionToken } from '@angular/core';

export type DemoMode = 'default' | 'collapsible';
export const DEMO_MODE = new InjectionToken<DemoMode>('DEMO_MODE');
