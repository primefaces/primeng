import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignTokenField } from '../app.designtokenfield.component';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule } from '@angular/forms';
import { DesignerService } from '@/service/designerservice';
import { palette } from '@primeng/themes';
import { DesignColorPalette } from '../app.designcolorpalette.component';

@Component({
    selector: 'design-general',
    standalone: true,
    imports: [CommonModule, DesignColorPalette, DesignTokenField, FormsModule, FieldsetModule],
    template: ` <p-fieldset legend="General" [toggleable]="true">
        <section class="flex justify-between items-center mb-4">
            <div class="flex gap-2 items-center">
                <span class="text-sm">Primary</span>
                <input [value]="designerService.preset().semantic.primary['500']" (input)="onPrimaryColorChange($event)" type="color" />
            </div>
            <design-color-palette [value]="designerService.preset().semantic.primary" />
        </section>
        <section class="grid grid-cols-4 mb-3 gap-2">
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.transitionDuration" label="Transition Duration" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.disabledOpacity" label="Disabled Opacity" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.iconSize" label="Icon Size" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.anchorGutter" label="Anchor Gutter" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.content.borderRadius" label="Border Radius" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.mask.transitionDuration" label="Mask Transition Dur." />
            </div>
            <div class="flex flex-col gap-1"></div>
            <div class="flex flex-col gap-1"></div>
        </section>

        <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Focus Ring</div>
        <section class="grid grid-cols-4 gap-2">
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.focusRing.width" label="Width" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.focusRing.style" label="Style" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.focusRing.color" label="Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.preset().semantic.focusRing.offset" label="Offset" />
            </div>
        </section>
    </p-fieldset>`
})
export class DesignGeneral {
    designerService = inject(DesignerService);

    onPrimaryColorChange(event) {
        this.designerService.preset().semantic.primary = palette(event.target.value);
    }
}
