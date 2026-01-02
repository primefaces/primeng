import { AppCode } from '@/components/doc/app.code';
import { Component } from '@angular/core';

@Component({
    selector: 'classnames-import-doc',
    standalone: true,
    imports: [AppCode],
    template: ` <app-code [hideToggleCode]="true"></app-code> `
})
export class ImportDoc {}
