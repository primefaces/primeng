import { Component } from '@angular/core';
import { AppCodeModule } from '@/components/doc/app.code';

@Component({
    selector: 'message-import-doc',
    standalone: true,
    imports: [AppCodeModule],
    template: ` <app-code [hideToggleCode]="true"></app-code> `
})
export class ImportDoc {}
