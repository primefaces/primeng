import { Component, inject, InjectionToken } from '@angular/core';

export const VALUE_TOKEN = new InjectionToken<any>('VALUE_TOKEN');

@Component({
    standalone: false,
    template: ` <p>{{ value }}</p> `
})
export class CustomProvidersDemo {
    protected readonly value = inject(VALUE_TOKEN);
}
