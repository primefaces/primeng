import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

@Component({
    selector: 'autocomplete-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, AutoCompleteModule, FormsModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-autocomplete [(ngModel)]="value" [dropdown]="true" [suggestions]="items" (completeMethod)="search($event)" appendTo="self" />
        </app-docptviewer>
    `
})
export class PTViewer {
    value: string = '';
    items: string[] = [];

    docs = [
        {
            data: getPTOptions('AutoComplete'),
            key: 'AutoComplete'
        }
    ];

    search(event: any) {
        const query = event.query;
        this.items = query ? Array.from({ length: 10 }, (_, i) => `${query}-${i}`) : Array.from({ length: 10 }, (_, i) => String(i));
    }
}
