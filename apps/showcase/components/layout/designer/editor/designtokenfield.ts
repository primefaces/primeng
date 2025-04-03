import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignerService } from '@/service/designerservice';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { $dt } from '@primeng/themes';
import { UniqueComponentId } from 'primeng/utils';

@Component({
    selector: 'design-token-field',
    standalone: true,
    imports: [CommonModule, AutoCompleteModule, FormsModule, TooltipModule],
    template: `<div>
        <div class="flex justify-between justify-items-center">
            <label for="inputId" class="text-xs text-zinc-700 dark:text-white/70 block capitalize text-ellipsis overflow-hidden w-full whitespace-nowrap mb-px" title="label">{{ label }}</label>
            <button *ngIf="switchable" type="button" (click)="transfer($event)" tabindex="-1">
                <i class="pi pi-sort-alt !text-xs text-zinc-500 dark:text-white/50 hidden group-hover:block animate-fadein" title="Transfer between color scheme and common"></i>
            </button>
        </div>
        <div [id]="id" class="relative">
            <p-autocomplete
                [ngClass]="{ 'ng-invalid': !modelValue }"
                [(ngModel)]="modelValue"
                [inputId]="inputId"
                [suggestions]="items"
                (onSelect)="onOptionSelect($event)"
                optionLabel="label"
                [showEmptyMessage]="false"
                (completeMethod)="search($event)"
                (onKeyUp)="onInput($event)"
                inputStyleClass="!text-xs"
            >
                <ng-template #item let-option>
                    <div [pTooltip]="getTooltipData(option)" tooltipPosition="left" class="w-full flex items-center justify-between gap-4 px-2">
                        <span>{{ option.token }}</span>
                        @if (getIsColor(option)) {
                            <div class="border border-surface-200 dark:border-surface-700 w-4 h-4 rounded-full" [style]="{ backgroundColor: option.variable }"></div>
                        } @else {
                            <div class="text-xs max-w-16 text-ellipsis whitespace-nowrap overflow-hidden">
                                {{ option.value }}
                            </div>
                        }
                    </div>
                </ng-template>
            </p-autocomplete>
            <div *ngIf="type === 'color'" class="absolute right-[4px] top-1/2 -mt-3 w-6 h-6 rounded-md border border-surface-300 dark:border-surface-600" [style]="{ backgroundColor: previewColor }"></div>
        </div>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesignTokenField implements OnInit {
    private designerService: DesignerService = inject(DesignerService);

    @Input() label: string | undefined;

    @Input() type: string | undefined;

    @Input() modelValue: any;

    @Input() switchable: boolean = false;

    @Input() path: string | undefined;

    @Input() componentKey: any;

    @Output() modelValueChange = new EventEmitter<any>();

    id: string | undefined;

    items: any;

    ngOnInit() {
        this.id = 'dt_field_' + UniqueComponentId();
    }

    getTooltipData(option) {
        return typeof option !== 'object' && option.value;
    }

    get inputId() {
        return this.id + '_input';
    }

    getIsColor(option) {
        return option.isColor;
    }

    get previewColor() {
        const tokenValue = typeof this.modelValue === 'object' ? this.modelValue.label : this.modelValue;
        return tokenValue && tokenValue.trim().length && tokenValue.startsWith('{') && tokenValue.endsWith('}') ? $dt(tokenValue).variable : tokenValue;
    }

    onOptionSelect(event) {
        this.modelValue = event.value.label;
        this.modelValueChange.emit(this.modelValue);
        event.originalEvent.stopPropagation();
    }

    onInput(event) {
        this.modelValue = event.target.value;
        this.modelValueChange.emit(this.modelValue);
    }

    search(event) {
        const query = event.query;

        if (query.startsWith('{')) {
            this.items = this.designerService.acTokens().filter((t) => t.label.startsWith(query));
        } else {
            this.items = [];
        }
    }

    getPathFromColorScheme(colorScheme) {
        const lightPrefix = 'light.';
        const darkPrefix = 'dark.';

        if (colorScheme.startsWith(lightPrefix)) {
            return colorScheme.slice(lightPrefix.length);
        } else if (colorScheme.startsWith(darkPrefix)) {
            return colorScheme.slice(darkPrefix.length);
        }

        return colorScheme;
    }

    transfer(event) {
        let tokens = this.designerService.designer().theme.preset.components[this.componentKey];
        const colorSchemePrefix = 'colorScheme.';

        if (this.path.startsWith(colorSchemePrefix)) {
            let tokenPath = this.getPathFromColorScheme(this.path.slice(colorSchemePrefix.length));

            this.set(tokens, tokenPath, this.modelValue);
            this.unset(tokens, 'colorScheme.light.' + tokenPath);
            this.unset(tokens, 'colorScheme.dark.' + tokenPath);
        } else {
            this.set(tokens, 'colorScheme.light.' + this.path, this.modelValue);
            this.set(tokens, 'colorScheme.dark.' + this.path, this.modelValue);
            this.unset(tokens, this.path);
        }

        this.removeEmptyProps(tokens);

        event.preventDefault();
    }

    removeEmptyProps(obj) {
        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];

                if (typeof value === 'object' && value !== null) {
                    this.removeEmptyProps(value);
                }

                if (typeof value === 'object' && value !== null && Object.keys(value).length === 0) {
                    delete obj[key];
                }
            }
        }

        return obj;
    }

    set(obj, path, value) {
        if (Object(obj) !== obj) return obj;
        const pathArray = Array.isArray(path) ? path : path.toString().match(/[^.[\]]+/g) || [];

        pathArray.reduce((acc, key, i) => {
            if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
                return acc;
            }

            if (i === pathArray.length - 1) {
                acc[key] = value;

                return value;
            }

            acc[key] = Object(acc[key]) === acc[key] ? acc[key] : {};

            return acc[key];
        }, obj);

        return obj;
    }

    unset(obj, path) {
        if (Object(obj) !== obj) return false;

        const pathArray = Array.isArray(path) ? path : path.toString().match(/[^.[\]]+/g) || [];

        if (pathArray.length === 0) return false;

        if (pathArray.includes('__proto__') || pathArray.includes('constructor') || pathArray.includes('prototype')) {
            return false;
        }

        let current = obj;
        const length = pathArray.length;

        for (let i = 0; i < length - 1; i++) {
            const key = pathArray[i];

            if (current[key] == null) {
                return false;
            }

            current = current[key];
        }

        const lastKey = pathArray[length - 1];

        if (!(lastKey in current)) {
            return false;
        }

        delete current[lastKey];

        return true;
    }
}
