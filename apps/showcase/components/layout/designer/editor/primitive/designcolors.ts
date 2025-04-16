import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule } from '@angular/forms';
import { DesignerService } from '@/service/designerservice';
import { palette } from '@primeng/themes';
import { DesignColorPalette } from '@/components/layout/designer/editor/designcolorpalette';

@Component({
    selector: 'design-colors',
    standalone: true,
    imports: [CommonModule, FieldsetModule, FormsModule, DesignColorPalette],
    template: ` <p-fieldset legend="Colors" [toggleable]="true">
        <ng-container *ngFor="let key of objectKeys(designerService.designer().theme?.preset?.primitive)">
            <section *ngIf="key !== 'borderRadius'" class="flex justify-between items-center mb-4 gap-8">
                <div class="flex gap-2 items-center">
                    <span class="text-sm capitalize block w-20">{{ key }}</span>
                    <input [value]="designerService.resolveColor(designerService.designer().theme.preset.primitive[key]['500'])" (change)="onColorChange($event, key)" (blur)="onBlur()" type="color" />
                </div>
                <design-color-palette [value]="designerService.designer().theme?.preset?.primitive[key]" />
            </section>
        </ng-container>
    </p-fieldset>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesignColors {
    designerService: DesignerService = inject(DesignerService);

    onColorChange(event: any, color: any) {
        this.designerService.designer.update((prev) => ({ ...prev, theme: { ...prev.theme, preset: { ...prev.theme.preset, primitive: { ...prev.theme.preset.primitive, [color]: palette(event.target.value) } } } }));
    }

    onBlur() {
        this.designerService.refreshACTokens();
    }

    objectKeys = Object.keys;
}
