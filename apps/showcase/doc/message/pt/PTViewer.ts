import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MessageModule } from 'primeng/message';

@Component({
    selector: 'message-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, MessageModule],
    template: `
        <app-docptviewer [docs]="docs">
            <div class="flex flex-col gap-4">
                <p-message severity="success" [closable]="true">Success Message Content</p-message>
                <p-message severity="info">Info Message Content</p-message>
                <p-message severity="warn" [closable]="true">Warning Message Content</p-message>
                <p-message severity="error">Error Message Content</p-message>
            </div>
        </app-docptviewer>
    `
})
export class PTViewer {
    docs = [
        {
            data: getPTOptions('Message'),
            key: 'Message'
        }
    ];
}
