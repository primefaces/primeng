import { AppCodeModule } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';

@Component({
    selector: 'dragdrop-doc',
    standalone: true,
    imports: [FormsModule, ListboxModule, AppCodeModule, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Items can be reordered using drag and drop by enabling <i>dragdrop</i> property. Depends on <i>&#64;angular/cdk</i> package.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-listbox [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" [dragdrop]="true" class="w-full md:w-56" />
        </div>
        <app-code [code]="code" selector="listbox-dragdrop-demo"></app-code>
    `
})
export class DragDropDoc implements OnInit {
    cities!: any[];
    selectedCity!: any;

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }

    code: Code = {
        basic: `<p-listbox [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" [dragdrop]="true" class="w-full md:w-56" />`,

        html: `<div class="card flex justify-center">
    <p-listbox [options]="cities" [(ngModel)]="selectedCity" optionLabel="name" [dragdrop]="true" class="w-full md:w-56" />
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Listbox } from 'primeng/listbox';

@Component({
    selector: 'listbox-dragdrop-demo',
    templateUrl: './listbox-dragdrop-demo.html',
    standalone: true,
    imports: [FormsModule, Listbox]
})
export class ListboxDragDropDemo implements OnInit {
    cities!: any[];
    selectedCity!: any;

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }
}`
    };
}
