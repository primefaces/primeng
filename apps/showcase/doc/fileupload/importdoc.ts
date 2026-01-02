import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';

@Component({
    selector: 'file-upload-import-doc',
    standalone: true,
    imports: [AppCode],
    template: ` <app-code [hideToggleCode]="true"></app-code> `
})
export class ImportDoc {}
