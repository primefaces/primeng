import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignTokenField } from '../app.designtokenfield.component';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule } from '@angular/forms';
import { DesignerService } from '@/service/designerservice';

@Component({
    selector: 'design-list',
    standalone: true,
    imports: [CommonModule, DesignTokenField, FormsModule, FieldsetModule],
    template: ` <p-fieldset legend="List" [toggleable]="true">
        <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Container</div>
        <section class="grid grid-cols-4 mb-3 gap-2">
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.list.padding" label="Padding" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.list.gap" label="Gap" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.list.header.padding" label="Header Padding" />
            </div>
            <div class="flex flex-col gap-1"></div>
        </section>

        <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Option</div>
        <section class="grid grid-cols-4 mb-3 gap-2">
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.list.option.padding" label="Padding" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.list.option.borderRadius" label="Border Radius" />
            </div>
        </section>

        <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Option Group</div>
        <section class="grid grid-cols-4 gap-2">
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.list.optionGroup.padding" label="Padding" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.list.optionGroup.fontWeight" label="Font Weight" />
            </div>
        </section>
    </p-fieldset>`
})
export class DesignList {
    designerService = inject(DesignerService);
}
