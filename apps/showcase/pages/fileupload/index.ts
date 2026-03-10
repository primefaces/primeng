import { AccessibilityDoc } from '@/doc/fileupload/accessibility-doc';
import { AdvancedDoc } from '@/doc/fileupload/advanced-doc';
import { AutoDoc } from '@/doc/fileupload/auto-doc';
import { BasicDoc } from '@/doc/fileupload/basic-doc';
import { UsageDoc } from '@/doc/fileupload/usage-doc';
import { PTComponent } from '@/doc/fileupload/pt/PTComponent';
import { TemplateDoc } from '@/doc/fileupload/template-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc
        docTitle="Angular FileUpload Component"
        header="FileUpload"
        description="FileUpload is an advanced uploader with dragdrop support, multi file uploads, auto uploading, progress tracking and validations."
        [docs]="docs"
        [heroDoc]="heroDoc"
        [apiDocs]="['FileUpload']"
        [ptDocs]="ptComponent"
        themeDocs="fileupload"
    ></app-doc>`
})
export class FileUploadDemo {
    ptComponent = PTComponent;
    heroDoc = BasicDoc;

    docs = [
        {
            id: 'usage',
            label: 'Usage',
            component: UsageDoc
        },
        {
            id: 'examples',
            label: 'Examples',
            children: [
                { id: 'basic', label: 'Basic', component: BasicDoc },
                { id: 'auto', label: 'Auto', component: AutoDoc },
                { id: 'advanced', label: 'Advanced', component: AdvancedDoc },
                { id: 'template', label: 'Template', component: TemplateDoc }
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
