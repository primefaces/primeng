import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'file-upload-import-doc',
    template: ` <app-code [code]="code" [hideToggleCode]="true"></app-code> `,
    standalone: false
})
export class ImportDoc {
    code: Code = {
        typescript: `import { FileUploadModule } from 'primeng/fileupload';`
    };
}
