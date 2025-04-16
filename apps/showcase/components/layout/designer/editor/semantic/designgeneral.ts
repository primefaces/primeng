import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignTokenField } from '@/components/layout/designer/editor/designtokenfield';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule } from '@angular/forms';
import { DesignerService } from '@/service/designerservice';
import { palette } from '@primeng/themes';
import { DesignColorPalette } from '@/components/layout/designer/editor/designcolorpalette';

@Component({
    selector: 'design-general',
    standalone: true,
    imports: [CommonModule, DesignColorPalette, DesignTokenField, FormsModule, FieldsetModule],
    template: ` <p-fieldset legend="General" [toggleable]="true">
        <section class="flex justify-between items-center mb-4 gap-8">
            <div class="flex gap-2 items-center">
                <span class="text-sm">Primary</span>
                <input [value]="designerService.resolveColor(designerService.designer().theme.preset.semantic.primary['500'])" (input)="onPrimaryColorChange($event)" type="color" />
            </div>
            <design-color-palette [value]="semantic()?.primary" />
        </section>
        <section class="grid grid-cols-4 mb-3 gap-2">
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.designer().theme.preset.semantic.transitionDuration" label="Transition Duration" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.designer().theme.preset.semantic.disabledOpacity" label="Disabled Opacity" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.designer().theme.preset.semantic.iconSize" label="Icon Size" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.designer().theme.preset.semantic.anchorGutter" label="Anchor Gutter" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.designer().theme.preset.semantic.content.borderRadius" label="Border Radius" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.designer().theme.preset.semantic.mask.transitionDuration" label="Mask Transition Dur." />
            </div>
            <div class="flex flex-col gap-1"></div>
            <div class="flex flex-col gap-1"></div>
        </section>

        <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0">Focus Ring</div>
        <section class="grid grid-cols-4 gap-2">
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.designer().theme.preset.semantic.focusRing.width" label="Width" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.designer().theme.preset.semantic.focusRing.style" label="Style" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.designer().theme.preset.semantic.focusRing.color" label="Color" [type]="'color'" />
            </div>
            <div class="flex flex-col gap-1">
                <design-token-field [(modelValue)]="designerService.designer().theme.preset.semantic.focusRing.offset" label="Offset" />
            </div>
        </section>
    </p-fieldset>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesignGeneral {
    designerService: DesignerService = inject(DesignerService);

    semantic = computed(() => this.designerService.designer().theme.preset.semantic);

    onPrimaryColorChange(event) {
        this.designerService.designer.update((prev) => ({ ...prev, theme: { ...prev.theme, preset: { ...prev.theme.preset, semantic: { ...prev.theme.preset.semantic, primary: palette(event.target.value) } } } }));
    }
}
