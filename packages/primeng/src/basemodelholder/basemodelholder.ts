import { computed, Directive, model, signal } from '@angular/core';
import { FormCheckboxControl } from '@angular/forms/signals';
import { isNotEmpty } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';

@Directive({ standalone: true })
export class BaseModelHolder<PT = any> extends BaseComponent<PT> {
    modelValue = signal<string | string[] | any | undefined>(undefined);

    value2 = model<any | null>(null);

    $filled = computed(() => isNotEmpty(this.modelValue()) || isNotEmpty(this.value2()));

    writeModelValue(value: any) {
        this.modelValue.set(value);
        this.value2.set(value);
    }
}

@Directive({ standalone: true })
export class BaseCheckboxModelHolder<PT = any> extends BaseComponent<PT> implements FormCheckboxControl {
    checked = model<boolean>(false);

    $filled = computed(() => isNotEmpty(this.checked()));

    writeModelValue(value: any) {
        this.checked.set(value);
    }
}
