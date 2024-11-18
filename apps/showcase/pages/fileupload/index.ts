import { AccessibilityDoc } from '@/doc/fileupload/accessibilitydoc';
import { AdvancedDoc } from '@/doc/fileupload/advanceddoc';
import { AutoDoc } from '@/doc/fileupload/autodoc';
import { BasicDoc } from '@/doc/fileupload/basicdoc';
import { FileUploadDocModule } from '@/doc/fileupload/fileuploaddoc.module';
import { ImportDoc } from '@/doc/fileupload/importdoc';
import { TemplateDoc } from '@/doc/fileupload/templatedoc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [FileUploadDocModule],
    template: ` <app-doc
        docTitle="Angular FileUpload Component"
        header="FileUpload"
        description="FileUpload is an advanced uploader with drag and drop support, multi file uploads, auto uploading, progress tracking and validations."
        [docs]="docs"
        [apiDocs]="['FileUpload']"
        themeDocs="fileupload"
    ></app-doc>`
})
export class FileUploadDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc
        },
        {
            id: 'auto',
            label: 'Auto',
            component: AutoDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'advanced',
            label: 'Advanced',
            component: AdvancedDoc
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
