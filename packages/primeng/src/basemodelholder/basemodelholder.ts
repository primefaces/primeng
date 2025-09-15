import { computed, Directive, signal } from '@angular/core';
import { isNotEmpty } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';

@Directive({ standalone: true })
export class BaseModelHolder extends BaseComponent {
    modelValue = signal<string | string[] | any | undefined>(undefined);

    $filled = computed(() => isNotEmpty(this.modelValue()));

    writeModelValue(value: any) {
        this.modelValue.set(value);
    }
}
