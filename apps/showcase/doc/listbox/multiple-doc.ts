import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

interface City {
    name: string;
    code: string;
}

@Component({
    selector: 'multiple-doc',
    standalone: true,
    imports: [FormsModule, ListboxModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>
                ListBox allows choosing a single item by default, enable <i>multiple</i> property to choose more than one. When the optional <i>metaKeySelection</i> is present, behavior is changed in a way that selecting a new item requires meta key
                to be present.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-listbox [options]="cities" [(ngModel)]="selectedCities" optionLabel="name" [multiple]="true" [metaKeySelection]="false" class="w-full md:w-56" />
        </div>
        <app-code></app-code>
    `
})
export class MultipleDoc implements OnInit {
    cities!: City[];

    selectedCities!: City[];

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }
}
