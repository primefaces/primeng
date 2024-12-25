import { EnvironmentProviders, inject, InjectionToken, makeEnvironmentProviders, provideAppInitializer } from '@angular/core';
import { PrimeNG, PrimeNGConfigType } from './primeng';

export const PRIME_NG_CONFIG = new InjectionToken<PrimeNGConfigType>('PRIME_NG_CONFIG');

export function providePrimeNG(...features: PrimeNGConfigType[]): EnvironmentProviders {
    const providers = features?.map((feature) => ({
        provide: PRIME_NG_CONFIG,
        useValue: feature,
        multi: false
    }));

    const initializer = provideAppInitializer(() => {
        const PrimeNGConfig = inject(PrimeNG);
        features?.forEach((feature) => PrimeNGConfig.setConfig(feature));
        return;
    });

    return makeEnvironmentProviders([...providers, initializer]);
}
