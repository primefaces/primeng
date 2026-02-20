import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, computed, inject, input, numberAttribute, output, TemplateRef } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { BindModule } from 'primeng/bind';
import { BlankIcon, CheckIcon } from 'primeng/icons';
import { Ripple } from 'primeng/ripple';
import type { Select } from './select';
import { SELECT_INSTANCE, SELECT_ITEM_INSTANCE } from './select-token';
import { SelectStyle } from './style/selectstyle';

@Component({
    selector: 'p-selectItem',
    standalone: true,
    imports: [NgTemplateOutlet, SharedModule, Ripple, CheckIcon, BlankIcon, BindModule],
    template: `
        <li
            [id]="id()"
            [pBind]="getPTOptions()"
            (click)="onOptionClick($event)"
            (mouseenter)="onOptionMouseEnter($event)"
            role="option"
            pRipple
            [attr.aria-label]="label()"
            [attr.aria-setsize]="ariaSetSize()"
            [attr.aria-posinset]="ariaPosInset()"
            [attr.aria-selected]="selected()"
            [attr.data-p-focused]="focused()"
            [attr.data-p-highlight]="selected()"
            [attr.data-p-selected]="selected()"
            [attr.data-p-disabled]="disabled()"
            [style]="itemSizeStyle()"
            [class]="cx('option')"
        >
            @if (checkmark()) {
                @if (selected()) {
                    <svg data-p-icon="check" [class]="cx('optionCheckIcon')" [pBind]="$pcSelect?.ptm('optionCheckIcon')" />
                } @else {
                    <svg data-p-icon="blank" [class]="cx('optionBlankIcon')" [pBind]="$pcSelect?.ptm('optionBlankIcon')" />
                }
            }
            @if (!template()) {
                <span [pBind]="$pcSelect?.ptm('optionLabel')">{{ label() ?? 'empty' }}</span>
            }
            <ng-container *ngTemplateOutlet="template(); context: templateContext()"></ng-container>
        </li>
    `,
    providers: [SelectStyle, { provide: PARENT_INSTANCE, useExisting: SelectItem }]
})
export class SelectItem extends BaseComponent {
    hostName = 'select';

    $pcSelectItem: SelectItem | undefined = inject(SELECT_ITEM_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    $pcSelect: Select | undefined = inject(SELECT_INSTANCE, { optional: true, skipSelf: true }) as Select | undefined;

    id = input<string>();

    option = input<any>();

    selected = input(undefined, { transform: booleanAttribute });

    focused = input(undefined, { transform: booleanAttribute });

    label = input<string>();

    disabled = input(undefined, { transform: booleanAttribute });

    visible = input(undefined, { transform: booleanAttribute });

    itemSize = input(undefined, { transform: numberAttribute });

    ariaPosInset = input<string>();

    ariaSetSize = input<string>();

    template = input<TemplateRef<any>>();

    checkmark = input(false, { transform: booleanAttribute });

    index = input<number>();

    scrollerOptions = input<any>();

    templateContext = computed(() => ({ $implicit: this.option() }));

    itemSizeStyle = computed(() => ({ height: this.scrollerOptions()?.itemSize + 'px' }));

    onClick = output<any>();

    onMouseEnter = output<any>();

    _componentStyle = inject(SelectStyle);

    onOptionClick(event: Event) {
        this.onClick.emit(event);
    }

    onOptionMouseEnter(event: Event) {
        this.onMouseEnter.emit(event);
    }

    getPTOptions() {
        return (
            this.$pcSelect?.getPTItemOptions?.(this.option(), this.scrollerOptions(), this.index() ?? 0, 'option') ??
            this.$pcSelect?.ptm('option', {
                context: {
                    option: this.option(),
                    selected: this.selected(),
                    focused: this.focused(),
                    disabled: this.disabled()
                }
            })
        );
    }
}
