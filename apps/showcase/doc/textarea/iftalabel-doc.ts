import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { TextareaModule } from 'primeng/textarea';

@Component({
    selector: 'iftalabel-doc',
    standalone: true,
    imports: [FormsModule, RouterModule, AppCode, AppDocSectionText, IftaLabelModule, TextareaModule],
    template: `
        <app-docsectiontext>
            <p>IftaLabel is used to create infield top aligned labels. Visit <a routerLink="/iftalabel">IftaLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-iftalabel>
                <textarea pTextarea id="description" [(ngModel)]="value" rows="5" cols="30" style="resize: none"></textarea>
                <label for="description">Description</label>
            </p-iftalabel>
        </div>
        <app-code></app-code>
    `
})
export class IftaLabelDoc {
    value: string = '';
}
