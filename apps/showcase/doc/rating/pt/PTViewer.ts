import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
    selector: 'rating-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, RatingModule, FormsModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-rating [(ngModel)]="value"></p-rating>
        </app-docptviewer>
    `
})
export class PTViewer {
    value: number | null = null;

    docs = [
        {
            data: getPTOptions('Rating'),
            key: 'Rating'
        }
    ];
}
