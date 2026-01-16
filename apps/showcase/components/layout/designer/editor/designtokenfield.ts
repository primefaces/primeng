import { DesignerService } from '@/service/designerservice';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, EventEmitter, inject, input, Input, model, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { $dt } from '@primeuix/themes';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TooltipModule } from 'primeng/tooltip';
import { UniqueComponentId } from 'primeng/utils';

@Component({
    selector: 'design-token-field',
    standalone: true,
    imports: [CommonModule, AutoCompleteModule, FormsModule, TooltipModule, ReactiveFormsModule],
    template: `<div class="group">
        <div class="flex justify-between items-center">
            <label for="inputId" class="text-xs text-zinc-700 dark:text-white/70 block capitalize text-ellipsis overflow-hidden w-full whitespace-nowrap mb-px" title="label">{{ label }}</label>
            <button *ngIf="switchable" type="button" (click)="transfer($event)" tabindex="-1" style="line-height:14px;">
                <i class="pi pi-sort-alt text-zinc-500 dark:text-white/50 !hidden group-hover:!inline-block animate-fadein" title="Transfer between color scheme and common" style="font-size: .75rem !important; line-height: 14px;"></i>
            </button>
        </div>
        <div [id]="id" class="relative">
            <p-autocomplete
                [class.ng-invalid]="isInvalid()"
                [class.ng-dirty]="isInvalid()"
                [class.ng-pristine]="!isInvalid()"
                [class.ng-untouched]="!isInvalid()"
                [class.ng-valid]="!isInvalid()"
                [(ngModel)]="modelValue"
                [inputId]="inputId"
                [suggestions]="items"
                (onSelect)="onOptionSelect($event)"
                optionLabel="label"
                unstyled
                [pt]="{
                    pcInputText: {
                        root: {
                            maxlength: 100,
                            class: [
                                'border text-zinc-950 dark:text-white rounded-lg py-2 px-2 w-full text-xs',
                                { 'pr-6': isColorType(), 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-500/30': isInvalid(), 'border-surface-300 dark:border-surface-600': !isInvalid() }
                            ]
                        }
                    },
                    overlay: 'border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-950 shadow-2 rounded-md',
                    listContainer: 'max-h-40 overflow-auto',
                    list: 'm-0 py-2 px-2 list-none',
                    loader: 'hidden',
                    option: 'cursor-pointer py-1 text-sm text-surface-700 dark:text-white/80 data-[p-focused=true]:bg-surface-100 data-[p-focused=true]:dark:bg-surface-800 rounded-md'
                }"
                [showEmptyMessage]="false"
                (completeMethod)="search($event)"
                (onKeyUp)="onInput($event)"
                [inputStyleClass]="inputStyleClass()"
                [maxlength]="100"
                [disabled]="designerService.isThemeViewOnly()"
            >
                <ng-template #item let-option>
                    <div [pTooltip]="getTooltipData(option)" tooltipPosition="left" class="w-full flex items-center justify-between gap-4 px-2">
                        <span>{{ option.label }}</span>
                        @if (getIsColor(option)) {
                            <div *ngIf="option.isColor" class="border border-surface-200 dark:border-surface-700 w-4 h-4 rounded-full" [style]="{ backgroundColor: resolveColorPlain(option.value) }"></div>
                        } @else {
                            <div class="text-xs max-w-16 text-ellipsis whitespace-nowrap overflow-hidden">
                                {{ option.value }}
                            </div>
                        }
                    </div>
                </ng-template>
            </p-autocomplete>
            <div *ngIf="isColorType()" class="absolute right-[4px] top-1/2 -mt-2 w-4 h-4 rounded-md border border-surface-300 dark:border-surface-600" [style]="{ backgroundColor: previewColor() }"></div>
        </div>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesignTokenField implements OnInit {
    designerService: DesignerService = inject(DesignerService);

    @Input() label: string | undefined;

    type = input<string>();

    modelValue = model<any>();

    @Input() switchable: boolean = false;

    @Input() path: string | undefined;

    @Input() componentKey: any;

    @Output() modelValueChange = new EventEmitter<any>();

    id: string | undefined;

    items: any;

    isColorType = computed(() => {
        if (this.type() === 'color') return true;
        if (!this.label) return false;
        const lowerName = this.label.toLowerCase();
        const colorShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
        return lowerName.includes('color') || lowerName.includes('background') || colorShades.includes(this.label);
    });

    inputStyleClass = computed(() => {
        const styleClass = this.isInvalid() ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-500/30' : 'border-surface-300 dark:border-surface-600';
        return this.isColorType() ? `!text-xs !pr-8 ${styleClass}` : `!text-xs ${styleClass}`;
    });

    isInvalid = computed(() => {
        return this.modelValue() == null || this.modelValue().trim().length === 0 || this.modelValue().startsWith(this.componentKey) || (this.modelValue().isColor && $dt(this.modelValue()).value == undefined);
    });

    previewColor = computed(() => {
        const tokenValue = typeof this.modelValue() === 'object' ? this.modelValue().name : this.modelValue();
        return tokenValue && tokenValue.trim().length && tokenValue.startsWith('{') && tokenValue.endsWith('}') ? $dt(tokenValue).variable : tokenValue;
    });

    ngOnInit() {
        this.id = 'dt_field_' + UniqueComponentId();
    }

    resolveColor(value: any) {
        return this.designerService.resolveColor(value);
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

    onOptionSelect(event) {
        this.modelValue.set(event.value.label);
        this.modelValueChange.emit(this.modelValue());
        event.originalEvent.stopPropagation();
    }

    onInput(event) {
        this.modelValue.set(event.target.value);
        this.modelValueChange.emit(this.modelValue());
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

            this.set(tokens, tokenPath, this.modelValue());
            this.unset(tokens, 'colorScheme.light.' + tokenPath);
            this.unset(tokens, 'colorScheme.dark.' + tokenPath);
        } else {
            this.set(tokens, 'colorScheme.light.' + this.path, this.modelValue());
            this.set(tokens, 'colorScheme.dark.' + this.path, this.modelValue());
            this.unset(tokens, this.path);
        }

        this.removeEmptyProps(tokens);
        this.designerService.designer.update((prev) => ({ ...prev, theme: { ...prev.theme, preset: { ...prev.theme.preset, components: { ...prev.theme.preset.components, [this.componentKey]: { ...tokens } } } } }));
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
