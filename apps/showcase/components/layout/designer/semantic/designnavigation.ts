import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignTokenField } from '../app.designtokenfield.component';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule } from '@angular/forms';
import { DesignerService } from '@/service/designerservice';

@Component({
    selector: 'design-navigation',
    standalone: true,
    imports: [CommonModule, DesignTokenField, FormsModule, FieldsetModule],
    template: ` <p-fieldset legend="Navigation" [toggleable]="true">
        <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">List</div>
        <section class="grid grid-cols-4 mb-3 gap-2">
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.navigation.list.padding" label="Padding" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.navigation.list.gap" label="Gap" />
            </div>
            <div class="flex flex-col gap-1"></div>
            <div class="flex flex-col gap-1"></div>
        </section>

        <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Item</div>
        <section class="grid grid-cols-4 mb-3 gap-2">
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.navigation.item.padding" label="Padding" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.navigation.item.borderRadius" label="Border Radius" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.navigation.item.gap" label="Gap" />
            </div>
            <div class="flex flex-col gap-1"></div>
        </section>

        <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Submenu Label</div>
        <section class="grid grid-cols-4 mb-3 gap-2">
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.navigation.submenuLabel.padding" label="Padding" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.navigation.submenuLabel.fontWeight" label="Font Weight" />
            </div>
            <div class="flex flex-col gap-1"></div>
            <div class="flex flex-col gap-1"></div>
        </section>

        <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Submenu Icon</div>
        <section class="grid grid-cols-4 gap-2">
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.navigation.submenuIcon.size" label="Size" />
            </div>
            <div class="flex flex-col gap-1"></div>
            <div class="flex flex-col gap-1"></div>
            <div class="flex flex-col gap-1"></div>
        </section>
    </p-fieldset>`
})
export class DesignNavigation {
    designerService = inject(DesignerService);
}
