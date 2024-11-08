import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';

export type PrimeNgConfigProps = { theme?: { preset: any }; ripple?: boolean; inputStyle?: 'outlined' | 'filled'; csp?: { nonce: string | undefined } };

export const PRIME_NG_CONFIG = new InjectionToken<PrimeNgConfigProps>('PRIME_NG_CONFIG');

export function providePrimeNgConfig(...features: PrimeNgConfigProps[]): EnvironmentProviders {
    const providers = features.map((feature) => ({
        provide: PRIME_NG_CONFIG,
        useValue: feature
    }));

    return makeEnvironmentProviders(providers);
}
