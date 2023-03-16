import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'animate-import-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id"> </app-docsectiontext>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </div>`
})
export class AnimateImportDemo {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        typescript: `
import { AnimateModule } from 'primeng/animate';`
    };
}
