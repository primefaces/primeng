import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignTokenField } from '../app.designtokenfield.component';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule } from '@angular/forms';
import { DesignerService } from '@/service/designerservice';

@Component({
    selector: 'design-form-field',
    standalone: true,
    imports: [CommonModule, DesignTokenField, FormsModule, FieldsetModule],
    template: ` <p-fieldset legend="Form Field" [toggleable]="true">
        <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Base</div>
        <section class="grid grid-cols-4 mb-3 gap-2">
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.formField.paddingX" label="Padding X" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.formField.paddingY" label="Padding Y" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.formField.borderRadius" label="Border Radius" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.formField.transitionDuration" label="Transition Duration" />
            </div>
        </section>

        <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Small</div>
        <section class="grid grid-cols-4 mb-3 gap-2">
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.formField.sm.paddingX" label="Padding X" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.formField.sm.paddingY" label="Padding Y" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.formField.sm.fontSize" label="Font Size" />
            </div>
            <div></div>
        </section>

        <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Large</div>
        <section class="grid grid-cols-4 mb-3 gap-2">
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.formField.lg.paddingX" label="Padding X" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.formField.lg.paddingY" label="Padding Y" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.formField.lg.fontSize" label="Font Size" />
            </div>
            <div></div>
        </section>

        <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Focus Ring</div>
        <section class="grid grid-cols-4 gap-2">
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.formField.focusRing.width" label="Width" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.formField.focusRing.style" label="Style" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.formField.focusRing.color" label="Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.formField.focusRing.offset" label="Offset" />
            </div>
        </section>
    </p-fieldset>`
})
export class DesignFormField {
    designerService = inject(DesignerService);
}
