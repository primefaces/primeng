import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule } from '@angular/forms';
import { DesignerService } from '@/service/designerservice';
import { palette } from '@primeng/themes';
import { DesignColorPalette } from '../app.designcolorpalette.component';

@Component({
    selector: 'design-colors',
    standalone: true,
    imports: [CommonModule, FieldsetModule, FormsModule, DesignColorPalette],
    template: ` <p-fieldset legend="Colors" [toggleable]="true">
        <ng-container *ngFor="let key of objectKeys(designerService.preset()?.primitive)">
            <section *ngIf="key !== 'borderRadius'" class="flex justify-between items-center mb-4">
                <div class="flex gap-2 items-center">
                    <span class="text-sm capitalize block w-20">{{ key }}</span>
                    <input [value]="designerService.preset()?.primitive[key]['500']" (input)="onColorChange($event, key)" type="color" />
                </div>
                <design-color-palette [value]="designerService.preset()?.primitive[key]" />
            </section>
        </ng-container>
    </p-fieldset>`
})
export class DesignColors {
    onColorChange(event, color) {
        this.designerService.preset().primitive[color] = palette(event.target.value);
    }

    designerService = inject(DesignerService);

    objectKeys = Object.keys;
}
