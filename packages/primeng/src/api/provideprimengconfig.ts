import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';

export type ThemeType = { preset?: any; options?: any } | 'none' | undefined;

export type PrimeNGConfigType = { theme?: ThemeType; ripple?: boolean; inputStyle?: 'outlined' | 'filled'; csp?: { nonce: string | undefined } };

export const PRIME_NG_CONFIG = new InjectionToken<PrimeNGConfigType>('PRIME_NG_CONFIG');

export function providePrimeNgConfig(...features: PrimeNGConfigType[]): EnvironmentProviders {
    const providers = features.map((feature) => ({
        provide: PRIME_NG_CONFIG,
        useValue: feature,
        multi: false
    }));

    return makeEnvironmentProviders(providers);
}
