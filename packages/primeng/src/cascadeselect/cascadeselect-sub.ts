import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input, numberAttribute, output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { calculateScrollbarWidth, equals, getHiddenElementOuterWidth, getOffset, getOuterWidth, getViewport, isNotEmpty, resolveFieldData } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { AngleRight as AngleRightIcon } from '@primeicons/angular/angle-right';
import { Ripple } from 'primeng/ripple';
import type { CascadeSelectOptionTemplateContext, CascadeSelectProcessedOption, CascadeSelectSubChangeEvent, CascadeSelectSubFocusChangeEvent } from 'primeng/types/cascadeselect';
import type { CascadeSelect } from './cascadeselect';
import { CASCADESELECT_INSTANCE } from './cascadeselect-token';
import { CascadeSelectStyle } from './style/cascadeselectstyle';

@Component({
    selector: 'ul[pCascadeSelectSub]',
    standalone: true,
    imports: [NgTemplateOutlet, Ripple, AngleRightIcon, SharedModule, Bind],
    template: `
        @for (processedOption of options(); track processedOption.key; let i = $index) {
            <li
                [class]="cx('option', { processedOption })"
                role="treeitem"
                [attr.aria-level]="level() + 1"
                [attr.aria-setsize]="options()?.length"
                [pBind]="getPTOptions(processedOption, i, 'option')"
                [id]="getOptionId(processedOption)"
                [attr.aria-label]="getOptionLabelToRender(processedOption)"
                [attr.aria-selected]="getAriaSelected(processedOption)"
                [attr.aria-posinset]="i + 1"
            >
                <div
                    [class]="cx('optionContent')"
                    (click)="onOptionClick($event, processedOption)"
                    (mouseenter)="onOptionMouseEnter($event, processedOption)"
                    (mousemove)="onOptionMouseMove($event, processedOption)"
                    pRipple
                    [pBind]="getPTOptions(processedOption, i, 'optionContent')"
                >
                    @if (optionTemplate()) {
                        <ng-container *ngTemplateOutlet="optionTemplate(); context: getOptionTemplateContext(processedOption)"></ng-container>
                    } @else {
                        <span [class]="cx('optionText')" [pBind]="getPTOptions(processedOption, i, 'optionText')">{{ getOptionLabelToRender(processedOption) }}</span>
                    }
                    @if (isOptionGroup(processedOption)) {
                        <span [class]="cx('groupIcon')" [pBind]="getPTOptions(processedOption, i, 'groupIcon')">
                            @if (!groupicon()) {
                                <svg data-p-icon="angle-right" [pBind]="getPTOptions(processedOption, i, 'groupIcon')" />
                            } @else {
                                <ng-container *ngTemplateOutlet="groupicon()"></ng-container>
                            }
                        </span>
                    }
                </div>
                @if (shouldShowSubList(processedOption)) {
                    <ul
                        pCascadeSelectSub
                        [attrrole]="'group'"
                        [class]="cx('optionList')"
                        [selectId]="selectId()"
                        [focusedOptionId]="focusedOptionId()"
                        [activeOptionPath]="activeOptionPath()"
                        [options]="getOptionGroupChildren(processedOption)"
                        [optionLabel]="optionLabel()"
                        [optionValue]="optionValue()"
                        [level]="level() + 1"
                        (onChange)="onChange.emit($event)"
                        (onFocusChange)="onFocusChange.emit($event)"
                        (onFocusEnterChange)="onFocusEnterChange.emit($event)"
                        [optionGroupLabel]="optionGroupLabel()"
                        [optionGroupChildren]="optionGroupChildren()"
                        [dirty]="dirty()"
                        [optionTemplate]="optionTemplate()"
                        [pBind]="ptm('optionList')"
                        [pt]="pt"
                        [unstyled]="unstyled()"
                    ></ul>
                }
            </li>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CascadeSelectStyle, { provide: PARENT_INSTANCE, useExisting: CascadeSelectSub }]
})
export class CascadeSelectSub extends BaseComponent {
    selectId = input<string>();

    activeOptionPath = input<CascadeSelectProcessedOption[]>();

    optionDisabled = input<string>();

    focusedOptionId = input<string>();

    options = input<CascadeSelectProcessedOption[]>();

    optionGroupChildren = input<string[] | string | null>();

    optionTemplate = input<TemplateRef<CascadeSelectOptionTemplateContext>>();

    groupicon = input<TemplateRef<void>>();

    level = input(0, { transform: numberAttribute });

    optionLabel = input<string>();

    optionValue = input<string>();

    optionGroupLabel = input<string>();

    dirty = input(false, { transform: booleanAttribute });

    root = input(false, { transform: booleanAttribute });

    onChange = output<CascadeSelectSubChangeEvent>();

    onFocusChange = output<CascadeSelectSubFocusChangeEvent>();

    onFocusEnterChange = output<CascadeSelectSubFocusChangeEvent>();

    _componentStyle = inject(CascadeSelectStyle);

    cascadeselect = inject<CascadeSelect>(CASCADESELECT_INSTANCE);

    getPTOptions(processedOption: CascadeSelectProcessedOption, index: number, key: string) {
        return this.ptm(key, {
            context: {
                option: processedOption,
                index,
                level: this.level(),
                optionGroup: this.isOptionGroup(processedOption),
                active: this.isOptionActive(processedOption),
                focused: this.isOptionFocused(processedOption),
                disabled: this.isOptionDisabled(processedOption)
            }
        });
    }

    onInit() {
        if (!this.root()) {
            this.position();
        }
    }

    onOptionClick(event: Event, processedOption: CascadeSelectProcessedOption) {
        this.onChange.emit({
            originalEvent: event,
            processedOption,
            isFocus: true
        });
    }

    onOptionMouseEnter(event: MouseEvent, processedOption: CascadeSelectProcessedOption) {
        this.onFocusEnterChange.emit({ originalEvent: event, processedOption });
    }

    onOptionMouseMove(event: MouseEvent, processedOption: CascadeSelectProcessedOption) {
        this.onFocusChange.emit({ originalEvent: event, processedOption });
    }

    getOptionId(processedOption: CascadeSelectProcessedOption) {
        return `${this.selectId()}_${processedOption.key}`;
    }

    getOptionLabel(processedOption: CascadeSelectProcessedOption) {
        const optionLabel = this.optionLabel();
        return optionLabel ? resolveFieldData(processedOption.option, optionLabel) : processedOption.option;
    }

    getOptionValue(processedOption: CascadeSelectProcessedOption) {
        const optionValue = this.optionValue();
        return optionValue ? resolveFieldData(processedOption.option, optionValue) : processedOption.option;
    }

    getOptionLabelToRender(processedOption: CascadeSelectProcessedOption) {
        return this.isOptionGroup(processedOption) ? this.getOptionGroupLabel(processedOption) : this.getOptionLabel(processedOption);
    }

    isOptionDisabled(processedOption: CascadeSelectProcessedOption) {
        const optionDisabled = this.optionDisabled();
        return optionDisabled ? resolveFieldData(processedOption.option, optionDisabled) : false;
    }

    getOptionGroupLabel(processedOption: CascadeSelectProcessedOption) {
        const optionGroupLabel = this.optionGroupLabel();
        return optionGroupLabel ? resolveFieldData(processedOption.option, optionGroupLabel) : null;
    }

    getOptionGroupChildren(processedOption: CascadeSelectProcessedOption) {
        return processedOption.children;
    }

    isOptionGroup(processedOption: CascadeSelectProcessedOption) {
        return isNotEmpty(processedOption.children);
    }

    isOptionSelected(processedOption: CascadeSelectProcessedOption) {
        return equals(this.cascadeselect?.modelValue(), processedOption?.option);
    }

    isOptionActive(processedOption: CascadeSelectProcessedOption) {
        return this.activeOptionPath()?.some((path) => path.key === processedOption.key);
    }

    isOptionFocused(processedOption: CascadeSelectProcessedOption) {
        return this.focusedOptionId() === this.getOptionId(processedOption);
    }

    shouldShowSubList(processedOption: CascadeSelectProcessedOption) {
        return this.isOptionGroup(processedOption) && this.isOptionActive(processedOption);
    }

    getAriaSelected(processedOption: CascadeSelectProcessedOption) {
        return this.isOptionGroup(processedOption) ? undefined : this.isOptionSelected(processedOption);
    }

    getOptionTemplateContext(processedOption: CascadeSelectProcessedOption) {
        return { $implicit: processedOption?.option, level: this.level() };
    }

    position() {
        const parentItem = this.el.nativeElement.parentElement;
        const containerOffset = <any>getOffset(parentItem);
        const viewport = <any>getViewport();
        const sublistWidth = this.el.nativeElement.childNodes[0].offsetParent ? this.el.nativeElement.children[0].offsetWidth : getHiddenElementOuterWidth(this.el.nativeElement.children[0]);
        const itemOuterWidth = <any>getOuterWidth(parentItem.children[0]);
        if (parseInt(containerOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - calculateScrollbarWidth()) {
            this.el.nativeElement.children[0].style.left = '-200%';
        }
    }
}
