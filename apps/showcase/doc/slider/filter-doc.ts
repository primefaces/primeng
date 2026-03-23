import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';

@Component({
    selector: 'filter-doc',
    standalone: true,
    imports: [FormsModule, SliderModule, SelectButtonModule, AppDocSectionText, AppCode],
    template: `
        <app-docsectiontext>
            <p>Image filter implementation using multiple sliders.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <div class="flex flex-col items-center">
                <img alt="user header" class="w-full md:w-80 rounded mb-6" src="https://primefaces.org/cdn/primevue/images/card-vue.jpg" [style]="filterStyle" />
                <p-selectbutton [(ngModel)]="filter" [options]="filterOptions" optionLabel="label" optionValue="value" class="mb-4" />
                <p-slider [(ngModel)]="filterValues[filter]" class="w-56" [min]="0" [max]="200" />
            </div>
        </div>
        <app-code></app-code>
    `
})
export class FilterDoc {
    filter: number = 0;

    filterValues: number[] = [100, 100, 0];

    filterOptions: any = [
        { label: 'Contrast', value: 0 },
        { label: 'Brightness', value: 1 },
        { label: 'Sepia', value: 2 }
    ];

    get filterStyle() {
        return {
            filter: `contrast(${this.filterValues[0]}%) brightness(${this.filterValues[1]}%) sepia(${this.filterValues[2]}%)`
        };
    }
}
