import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

interface City {
    label: string;
    value: string;
}

interface Country {
    label: string;
    code: string;
    items: City[];
}

@Component({
    selector: 'select-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, SelectModule, FormsModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-select [(ngModel)]="selectedCity" [filter]="true" [options]="groupedCities" optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" [showClear]="true" placeholder="Select a City" styleClass="w-full md:w-56">
                <ng-template #group let-group>
                    <div class="flex items-center">
                        <img [alt]="group.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" [class]="'mr-2 flag flag-' + group.code.toLowerCase()" style="width: 18px" />
                        <div>{{ group.label }}</div>
                    </div>
                </ng-template>
            </p-select>
        </app-docptviewer>
    `
})
export class PTViewer {
    selectedCity: City | null = null;

    groupedCities: Country[] = [
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
            data: getPTOptions('Select'),
            key: 'Select'
        }
    ];
}
