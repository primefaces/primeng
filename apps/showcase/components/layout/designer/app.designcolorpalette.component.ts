import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'design-color-palette',
    standalone: true,
    imports: [CommonModule],
    template: ` <div class="flex border border-surface rounded-l-lg rounded-r-lg overflow-hidden">
        <div *ngFor="let color of value | keyvalue" class="w-8 h-8" [style]="{ backgroundColor: color.value }" [title]="color.value"></div>
    </div>`
})
export class DesignColorPalette {
    @Input() value;
}
