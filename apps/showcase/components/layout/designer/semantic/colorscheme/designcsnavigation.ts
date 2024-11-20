import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignTokenField } from '../../app.designtokenfield.component';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'design-cs-navigation',
    standalone: true,
    imports: [CommonModule, DesignTokenField, FormsModule, FieldsetModule],
    template: ` <p-fieldset legend="Navigation" :toggleable="true">
        <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Item</div>
        <section class="grid grid-cols-4 mb-3 gap-2">
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.navigation.item.focusBackground" label="Focus BG" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.navigation.item.focusBackground" label="Active BG" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1"></div>
            <div class="flex flex-col gap-1"></div>

            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.navigation.item.color" label="Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.navigation.item.focusColor" label="Focus Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.navigation.item.activeColor" label="Active Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1"></div>
        </section>

        <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Item Icon</div>
        <section class="grid grid-cols-4 mb-3 gap-2">
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.navigation.item.icon.color" label="Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.navigation.item.icon.focusColor" label="Focus Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.navigation.item.icon.activeColor" label="Active Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1"></div>
        </section>

        <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Submenu Label</div>
        <section class="grid grid-cols-4 mb-3 gap-2">
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.navigation.submenuLabel.background" label="BG" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.navigation.submenuLabel.color" label="Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1"></div>
            <div class="flex flex-col gap-1"></div>
        </section>

        <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Submenu Icon</div>
        <section class="grid grid-cols-4 mb-3 gap-2">
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.navigation.submenuIcon.color" label="Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.navigation.submenuIcon.focusColor" label="Focus Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="colorScheme.navigation.submenuIcon.activeColor" label="Active Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1"></div>
        </section>
    </p-fieldset>`
})
export class DesignCSNavigation {
    @Input() colorScheme: any;
}
