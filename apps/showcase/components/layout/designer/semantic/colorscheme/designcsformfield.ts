import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignTokenField } from '../../app.designtokenfield.component';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'design-cs-form-field',
    standalone: true,
    imports: [CommonModule, DesignTokenField, FormsModule, FieldsetModule],
    template: ` <p-fieldset legend="Form Field" [toggleable]="true">
        <section class="grid grid-cols-4 mb-3 gap-2">
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.formField.background" label="BG" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.formField.color" label="Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.formField.iconColor" label="Icon Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.formField.shadow" label="Shadow" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.formField.borderColor" label="Border Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.formField.hoverBorderColor" label="Hover Border Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.formField.focusBorderColor" label="Focus Border Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.formField.invalidBorderColor" label="Invalid Border Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.formField.disabledBackground" label="Disabled BG" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.formField.disabledColor" label="Disabled Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.formField.placeholderColor" label="Placeholder" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.formField.invalidPlaceholderColor" label="Invalid Placeholder" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.formField.filledBackground" label="Filled BG" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.formField.filledHoverBackground" label="Filled Hover BG" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.formField.filledFocusBackground" label="Filled Focus BG" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1"></div>
        </section>

        <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Float Label</div>
        <section class="grid grid-cols-4 gap-2">
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.formField.floatLabelColor" label="Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.formField.floatLabelFocusColor" label="Focus Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.formField.floatLabelActiveColor" label="Active Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.formField.floatLabelInvalidColor" label="Invalid Color" [type]="'color'" />
            </div>
        </section>
    </p-fieldset>`
})
export class DesignCSFormField {
    @Input() colorScheme: any;
}
