import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, computed, inject, input, numberAttribute, output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { Checkbox } from 'primeng/checkbox';
import type { MultiSelectItemCheckboxIconTemplateContext, MultiSelectItemClickEvent, MultiSelectItemMouseEnterEvent, MultiSelectItemTemplateContext } from 'primeng/types/multiselect';
import type { InputVariant } from 'primeng/types/shared';
import { MULTISELECT_ITEM_INSTANCE } from './multiselect-token';
import { MultiSelectStyle } from './style/multiselectstyle';

@Component({
    selector: 'li[pMultiSelectItem]',
    standalone: true,
    imports: [NgTemplateOutlet, Checkbox, FormsModule, SharedModule],
    template: `
        <p-checkbox [ngModel]="selected()" [binary]="true" [tabindex]="-1" [variant]="variant()" [ariaLabel]="label()" [pt]="getPTOptions('pcOptionCheckbox')" [unstyled]="unstyled()">
            @if (itemCheckboxIconTemplate()) {
                <ng-template #icon let-klass="class">
                    <ng-container *ngTemplateOutlet="itemCheckboxIconTemplate(); context: getCheckboxIconContext(klass)"></ng-container>
                </ng-template>
            }
        </p-checkbox>
        @if (!template()) {
            <span>{{ label() ?? 'empty' }}</span>
        }
        <ng-container *ngTemplateOutlet="template(); context: templateContext()"></ng-container>
    `,
    encapsulation: ViewEncapsulation.None,
    providers: [MultiSelectStyle],
    host: {
        '[style.height.px]': 'itemSize()',
        '[attr.aria-label]': 'label()',
        role: 'option',
        '[attr.aria-setsize]': 'ariaSetSize()',
        '[attr.aria-posinset]': 'ariaPosInset()',
        '[attr.aria-selected]': 'selected()',
        '[attr.data-p-selected]': 'selected()',
        '[attr.data-p-focused]': 'focused()',
        '[attr.data-p-highlight]': 'selected()',
        '[attr.data-p-disabled]': 'disabled()',
        '[attr.aria-checked]': 'selected()',
        '(click)': 'onOptionClick($event)',
        '(mouseenter)': 'onOptionMouseEnter($event)',
        '[class]': "cx('option')"
    }
})
export class MultiSelectItem extends BaseComponent {
    $pcMultiSelectItem: MultiSelectItem | undefined = inject(MULTISELECT_ITEM_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    hostName = 'MultiSelect';

    getPTOptions(key) {
        return this.ptm(key, {
            context: {
                selected: this.selected(),
                focused: this.focused(),
                disabled: this.disabled()
            }
        });
    }

    option = input<any>();

    selected = input(undefined, { transform: booleanAttribute });

    label = input<string>();

    disabled = input(undefined, { transform: booleanAttribute });

    itemSize = input(undefined, { transform: numberAttribute });

    focused = input(undefined, { transform: booleanAttribute });

    ariaPosInset = input<string>();

    ariaSetSize = input<string>();

    variant = input<InputVariant>();

    template = input<TemplateRef<MultiSelectItemTemplateContext>>();

    checkIconTemplate = input<TemplateRef<MultiSelectItemCheckboxIconTemplateContext>>();

    itemCheckboxIconTemplate = input<TemplateRef<MultiSelectItemCheckboxIconTemplateContext>>();

    highlightOnSelect = input(undefined, { transform: booleanAttribute });

    onClick = output<MultiSelectItemClickEvent>();

    onMouseEnter = output<MultiSelectItemMouseEnterEvent>();

    _componentStyle = inject(MultiSelectStyle);

    templateContext = computed(() => ({ $implicit: this.option() }));

    getCheckboxIconContext(klass: string) {
        return { checked: this.selected(), class: klass };
    }

    onOptionClick(event: Event) {
        this.onClick.emit({
            originalEvent: event,
            option: this.option(),
            selected: this.selected() ?? false
        });
        event.stopPropagation();
        event.preventDefault();
    }

    onOptionMouseEnter(event: Event) {
        this.onMouseEnter.emit({
            originalEvent: event,
            option: this.option(),
            selected: this.selected() ?? false
        });
    }
}
