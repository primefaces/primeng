import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'toast-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer],
    template: `
        <app-docptviewer [docs]="docs">
            <div class="p-toast p-component" data-pc-name="toast" data-pc-section="root">
                <div>
                    <div class="p-toast-message p-toast-message-info" data-pc-section="message">
                        <div class="p-toast-message-content" data-pc-section="messagecontent">
                            <i class="pi pi-info-circle p-toast-message-icon" data-pc-section="messageicon"></i>
                            <div class="p-toast-message-text" data-pc-section="messagetext">
                                <span class="p-toast-summary" data-pc-section="summary">Message Summary</span>
                                <div class="p-toast-detail" data-pc-section="detail">Message Detail</div>
                            </div>
                            <div data-pc-section="buttoncontainer">
                                <button class="p-toast-close-button" type="button" data-pc-section="closebutton">
                                    <i class="pi pi-times p-toast-close-icon" data-pc-section="closeicon"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </app-docptviewer>
    `
})
export class PTViewer {
    docs = [
        {
            data: getPTOptions('Toast'),
            key: 'Toast'
        }
    ];
}
