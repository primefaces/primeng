import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignTokenField } from '../../app.designtokenfield.component';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'design-cs-overlay',
    standalone: true,
    imports: [CommonModule, DesignTokenField, FormsModule, FieldsetModule],
    template: ` <p-fieldset legend="Overlay" [toggleable]="true">
        <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Select</div>
        <section class="grid grid-cols-4 mb-3 gap-2">
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.overlay.select.background" label="BG" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.overlay.select.borderColor" label="Border Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.overlay.select.color" label="Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1"></div>
        </section>

        <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Popover</div>
        <section class="grid grid-cols-4 mb-3 gap-2">
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.overlay.popover.background" label="BG" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.overlay.popover.borderColor" label="Border Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.overlay.popover.color" label="Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1"></div>
        </section>

        <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Modal</div>
        <section class="grid grid-cols-4 gap-2">
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.overlay.modal.background" label="BG" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.overlay.modal.borderColor" label="Border Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.overlay.modal.color" label="Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1"></div>
        </section>
    </p-fieldset>`
})
export class DesignCSOverlay {
    @Input() colorScheme: any;
}
