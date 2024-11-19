import { Component, inject, Input, ViewEncapsulation } from '@angular/core';
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
    styleUrl: './designtokenfieldstyle.scss',
    template: ` <div>
        <label [for]="inputId" class="text-sm text-zinc-700 dark:text-white">{{ label }}</label>
        <div [id]="id" class="relative">
            <!-- <AutoComplete
                :modelValue="modelValue"
                @input="onInput"
                :inputId="inputId"
                :suggestions="items"
                @complete="search"
                unstyled
                optionLabel="label"
                :showEmptyMessage="false"
                :pt="{
              pcInputText: {
                  root: ['border border-surface-300 dark:border-surface-600 rounded-lg py-2 px-2 w-full', { 'pr-8': type === 'color' }]
              },
              overlay: 'border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-950 shadow-2 rounded-md',
              listContainer: 'max-h-40 overflow-auto',
              list: 'm-0 py-2 px-2 list-none',
              loader: 'hidden',
              option: 'cursor-pointer py-1 text-sm text-surface-700 dark:text-white/80 data-[p-focus=true]:bg-surface-100 data-[p-focus=true]:dark:bg-surface-800 rounded-md'
          }"
                @option-select="onOptionSelect"
            > -->
            <p-autocomplete [(ngModel)]="modelValue" [inputId]="inputId" [suggestions]="items" (onSelect)="onOptionSelect($event)" optionLabel="label" [showEmptyMessage]="false" (completeMethod)="search($event)" (onKeyUp)="onInput($event)">
                <ng-template #item let-option>
                    <div [pTooltip]="getTooltipData(option)" tooltipPosition="left" class="w-full flex items-center justify-between gap-4 px-2">
                        <span>{{ option.token }}</span>
                        @if (option.isColor) {
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
    encapsulation: ViewEncapsulation.None
})
export class DesignTokenField {
    @Input() label: string | undefined;

    @Input() type: string | undefined;

    @Input() modelValue;

    id: string | undefined;

    items;

    ngOnInit() {
        this.id = 'dt_field_' + UniqueComponentId();
    }

    private designerService = inject(DesignerService);

    getTooltipData(option) {
        return typeof option.value !== 'object' && option.value;
    }

    get inputId() {
        return this.id + '_input';
    }

    get previewColor() {
        const tokenValue = typeof this.modelValue === 'object' ? this.modelValue.label : this.modelValue;
        return tokenValue && tokenValue.trim().length && tokenValue.startsWith('{') && tokenValue.endsWith('}') ? $dt(tokenValue).variable : tokenValue;
    }

    onOptionSelect(event) {
        this.modelValue = event.value.label;
        event.originalEvent.stopPropagation();
    }

    onInput(event) {
        this.modelValue = event.target.value;
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
