import { DesignerService } from '@/service/designerservice';
import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';

@Component({
    selector: 'design-color-palette',
    standalone: true,
    imports: [CommonModule],
    template: ` @if (value()) {
        <div *ngFor="let color of objectValues(value())" class="flex-1 h-8 w-8" [ngStyle]="{ backgroundColor: designerService.resolveColor(color) }" [title]="color"></div>
    }`,
    host: {
        class: 'flex w-full border border-surface rounded-l-lg rounded-r-lg overflow-hidden'
    }
})
export class DesignColorPalette {
    designerService: DesignerService = inject(DesignerService);

    value = input<any>({});

    objectValues = Object.values;
}
