import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'footer',
    template: `
        <div class="flex w-full justify-content-end mt-3">
            <p-button type="button" label="Cancel" icon="pi pi-times" (onClick)="closeDialog({ buttonType: 'Cancel', summary: 'No Product Selected' })"></p-button>
        </div>
    `,
    standalone: false
})
export class Footer {
    constructor(public ref: DynamicDialogRef) {}

    closeDialog(data) {
        this.ref.close(data);
    }
}
