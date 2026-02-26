import { DesignerService } from '@/service/designerservice';
import { Component, inject, input } from '@angular/core';

@Component({
    selector: 'design-color-palette',
    standalone: true,
    imports: [],
    template: ` @if (value()) {
        @for (color of objectValues(value()); track $index) {
            <div class="flex-1 h-8 w-8" [style]="{ backgroundColor: designerService.resolveColor(color) }" [title]="color"></div>
        }
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
