import { AccessibilityDoc } from '@/doc/inplace/accessibilitydoc';
import { BasicDoc } from '@/doc/inplace/basicdoc';
import { ImageDoc } from '@/doc/inplace/imagedoc';
import { ImportDoc } from '@/doc/inplace/importdoc';
import { InplaceDocModule } from '@/doc/inplace/inplacedoc.module';
import { InputDoc } from '@/doc/inplace/inputdoc';
import { LazyDoc } from '@/doc/inplace/lazydoc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [InplaceDocModule],
    template: ` <app-doc
        docTitle="Angular Inplace Component"
        header="Inplace"
        description="Inplace provides an easy to do editing and display at the same time where clicking the output displays the actual content."
        [docs]="docs"
        [apiDocs]="['Inplace']"
        themeDocs="Inplace"
    ></app-doc>`
})
export class InplaceDemo {
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
