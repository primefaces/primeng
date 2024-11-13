import { Code } from '@/domain/code';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'import-doc',
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code>`
})
export class ImportDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        typescript: `import { OverlayModule } from 'primeng/overlay';`
    };
}
