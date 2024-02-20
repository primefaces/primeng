import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'import-doc',
    template: ` test`
})
export class ImportDoc {
     code: Code = {
         typescript: `import { FileUploadModule } from 'primeng/fileupload';`
     };
}

