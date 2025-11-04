import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
    selector: 'multiselect-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, MultiSelectModule, FormsModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-multiselect
                [(ngModel)]="selectedCities"
                [options]="groupedCities"
                optionLabel="label"
                [filter]="true"
                optionGroupLabel="label"
                optionGroupChildren="items"
                display="chip"
                [showClear]="true"
                placeholder="Select Cities"
                class="w-full md:w-80"
            >
                <ng-template #group let-group>
                    <div class="flex items-center">
                        <img [alt]="group.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" [class]="'flag flag-' + group.code.toLowerCase() + ' mr-2'" style="width: 18px" />
                        <div>{{ group.label }}</div>
                    </div>
                </ng-template>
            </p-multiselect>
        </app-docptviewer>
    `
})
export class PTViewer {
    selectedCities: any = null;

    groupedCities = [
        {
            label: 'Germany',
            code: 'DE',
            items: [
                { label: 'Berlin', value: 'Berlin' },
                { label: 'Frankfurt', value: 'Frankfurt' },
                { label: 'Hamburg', value: 'Hamburg' },
                { label: 'Munich', value: 'Munich' }
            ]
        },
        {
            label: 'USA',
            code: 'US',
            items: [
                { label: 'Chicago', value: 'Chicago' },
                { label: 'Los Angeles', value: 'Los Angeles' },
                { label: 'New York', value: 'New York' },
                { label: 'San Francisco', value: 'San Francisco' }
            ]
        },
        {
            label: 'Japan',
            code: 'JP',
            items: [
                { label: 'Kyoto', value: 'Kyoto' },
                { label: 'Osaka', value: 'Osaka' },
                { label: 'Tokyo', value: 'Tokyo' },
                { label: 'Yokohama', value: 'Yokohama' }
            ]
        }
    ];

    docs = [
        {
            data: getPTOptions('MultiSelect'),
            key: 'MultiSelect'
        }
    ];
}
