import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { TextareaModule } from 'primeng/textarea';

@Component({
    selector: 'autoresize-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText, TextareaModule],
    template: `
        <app-docsectiontext>
            <p>When <i>autoResize</i> is enabled, textarea grows instead of displaying a scrollbar.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <textarea rows="5" cols="30" pTextarea [autoResize]="true"></textarea>
        </div>
        <app-code selector="input-textarea-auto-resize-demo"></app-code>
    `
})
export class AutoResizeDoc {}
