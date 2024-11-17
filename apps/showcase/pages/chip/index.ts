import { AccessibilityDoc } from '@/doc/chip/accessibilitydoc';
import { BasicDoc } from '@/doc/chip/basicdoc';
import { ChipDocModule } from '@/doc/chip/chipdoc.module';
import { IconDoc } from '@/doc/chip/icondoc';
import { ImageDoc } from '@/doc/chip/imagedoc';
import { ImportDoc } from '@/doc/chip/importdoc';
import { TemplateDoc } from '@/doc/chip/templatedoc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [ChipDocModule],
    template: ` <app-doc docTitle="Angular Chip Component" header="Chip" description="Chip represents entities using icons, labels and images." [docs]="docs" [apiDocs]="['Chip']" themeDocs="chip"></app-doc>`
})
export class ChipDemo {
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
