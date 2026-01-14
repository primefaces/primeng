import { AccessibilityDoc } from '@/doc/inplace/accessibility-doc';
import { BasicDoc } from '@/doc/inplace/basic-doc';
import { ImageDoc } from '@/doc/inplace/image-doc';
import { ImportDoc } from '@/doc/inplace/import-doc';
import { InputDoc } from '@/doc/inplace/input-doc';
import { LazyDoc } from '@/doc/inplace/lazy-doc';
import { PTComponent } from '@/doc/inplace/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc
        docTitle="Angular Inplace Component"
        header="Inplace"
        description="Inplace provides an easy to do editing and display at the same time where clicking the output displays the actual content."
        [docs]="docs"
        [ptDocs]="ptComponent"
        [apiDocs]="['Inplace']"
        themeDocs="Inplace"
    ></app-doc>`
})
export class InplaceDemo {
    ptComponent = PTComponent;

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
            id: 'input',
            label: 'Input',
            component: InputDoc
        },
        {
            id: 'image',
            label: 'Image',
            component: ImageDoc
        },
        {
            id: 'lazy',
            label: 'Lazy',
            component: LazyDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
