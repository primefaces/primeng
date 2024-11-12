import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';

export type PrimeNgFeature = { theme?: { preset: any }; ripple?: boolean; inputStyle?: 'outlined' | 'filled'; csp?: { nonce: string | undefined } };

export const PRIME_NG_THEME = new InjectionToken<PrimeNgFeature>('PRIME_NG_THEME');

export function providePrimeNgConfig(...features: PrimeNgFeature[]): EnvironmentProviders {
    const providers = features.map((feature) => ({
        provide: PRIME_NG_THEME,
        useValue: feature
    }));

    return makeEnvironmentProviders(providers);
}
