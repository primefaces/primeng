import { AccessibilityDoc } from '@/doc/fluid/accessibilitydoc';
import { BasicDoc } from '@/doc/fluid/basicdoc';
import { ImportDoc } from '@/doc/fluid/importdoc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Fluid Component" header="Fluid" description="Fluid is a layout component to make descendant components span full width of their container." [docs]="docs" themeDocs="fluid"></app-doc> `
})
export class FluidDemo {
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
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
