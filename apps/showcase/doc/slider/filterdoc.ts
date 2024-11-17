import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'filter-doc',
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
        <app-code [code]="code" selector="slider-filter-demo"></app-code>
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
    code: Code = {
        basic: `<img alt="user header" class="w-full md:w-80 rounded mb-6" src="https://primefaces.org/cdn/primevue/images/card-vue.jpg" [style]="filterStyle" />
<p-selectbutton [(ngModel)]="filter" [options]="filterOptions" optionLabel="label" optionValue="value" class="mb-4" />
<p-slider [(ngModel)]="filterValues[filter]" class="w-56" [min]="0" [max]="200" />`,

        html: `<div class="card flex justify-center">
    <div class="flex flex-col items-center">
        <img alt="user header" class="w-full md:w-80 rounded mb-6" src="https://primefaces.org/cdn/primevue/images/card-vue.jpg" [style]="filterStyle" />
        <p-selectbutton [(ngModel)]="filter" [options]="filterOptions" optionLabel="label" optionValue="value" class="mb-4" />
        <p-slider [(ngModel)]="filterValues[filter]" class="w-56" [min]="0" [max]="200" />
    </div>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
    selector: 'slider-filter-demo',
    templateUrl: './slider-filter-demo.html',
    standalone: true,
    imports: [FormsModule, SliderModule, SelectButtonModule]
})
export class SliderFilterDemo {
    filter: number = 0;

    filterValues: number[] = [100, 100, 0];

    filterOptions: any = [
        { label: 'Contrast', value: 0 },
        { label: 'Brightness', value: 1 },
        { label: 'Sepia', value: 2 },
    ];

    get filterStyle() {
        return {
            filter: \`contrast(\${this.filterValues[0]}%) brightness(\${this.filterValues[1]}%) sepia(\${this.filterValues[2]}%)\`,
        };
    }
}`
    };

    get filterStyle() {
        return {
            filter: `contrast(${this.filterValues[0]}%) brightness(${this.filterValues[1]}%) sepia(${this.filterValues[2]}%)`
        };
    }
}
