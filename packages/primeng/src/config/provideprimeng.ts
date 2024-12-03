import { APP_INITIALIZER, EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from '@angular/core';
import { PrimeNG, PrimeNGConfigType } from './primeng';

export const PRIME_NG_CONFIG = new InjectionToken<PrimeNGConfigType>('PRIME_NG_CONFIG');

export function providePrimeNG(...features: PrimeNGConfigType[]): EnvironmentProviders {
    const providers = features?.map((feature) => ({
        provide: PRIME_NG_CONFIG,
        useValue: feature,
        multi: false
    }));

    // @todo: use provideAppInitializer in v19
    const initializer = {
        provide: APP_INITIALIZER,
        useFactory: (PrimeNGConfig: PrimeNG) => () => features?.forEach((feature) => PrimeNGConfig.setConfig(feature)),
        deps: [PrimeNG],
        multi: true
    };

    return makeEnvironmentProviders([...providers, initializer]);
}
