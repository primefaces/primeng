import { Component, EventEmitter, inject, Input, Output, ViewEncapsulation } from '@angular/core';
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
        <label [for]="inputId" class="text-sm text-zinc-700 dark:text-white">{{ label }}</label>
        <div [id]="id" class="relative">
            <p-autocomplete [(ngModel)]="modelValue" [inputId]="inputId" [suggestions]="items" (onSelect)="onOptionSelect($event)" optionLabel="label" [showEmptyMessage]="false" (completeMethod)="search($event)" (onKeyUp)="onInput($event)">
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
    </div>`
})
export class DesignTokenField {
    @Input() label: string | undefined;

    @Input() type: string | undefined;

    @Input() modelValue;

    @Output() modelValueChange = new EventEmitter<any>();

    id: string | undefined;

    items;

    ngOnInit() {
        this.id = 'dt_field_' + UniqueComponentId();
    }

    private designerService = inject(DesignerService);

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
}
