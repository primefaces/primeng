import { AccessibilityDoc } from '@/doc/chip/accessibility-doc';
import { BasicDoc } from '@/doc/chip/basic-doc';
import { IconDoc } from '@/doc/chip/icon-doc';
import { ImageDoc } from '@/doc/chip/image-doc';
import { ImportDoc } from '@/doc/chip/import-doc';
import { TemplateDoc } from '@/doc/chip/template-doc';
import { PTComponent } from '@/doc/chip/pt/PTComponent';
import { AppDoc } from '@/components/doc/app.doc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Chip Component" header="Chip" description="Chip represents entities using icons, labels and images." [docs]="docs" [apiDocs]="['Chip']" [ptDocs]="ptComponent" themeDocs="chip"></app-doc>`
})
export class ChipDemo {
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
            id: 'icon',
            label: 'Icon',
            component: IconDoc
        },
        {
            id: 'image',
            label: 'Image',
            component: ImageDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
