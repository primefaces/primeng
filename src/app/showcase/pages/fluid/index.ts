import { Component } from '@angular/core';
import { ImportDoc } from '@doc/fluid/importdoc';
import { BasicDoc } from '@doc/fluid/basicdoc';
import { AccessibilityDoc } from '@doc/fluid/accessibilitydoc';
import { FluidDocModule } from '@doc/fluid/fluiddoc.module';

@Component({
    standalone: true,
    imports: [FluidDocModule],
    template: `
        <app-doc
            docTitle="Angular Fluid Component"
            header="Fluid"
            description="Fluid is a layout component to make descendant components span full width of their container."
            [docs]="docs"
            themeDocs="fluid"
        ></app-doc>
    `,
})
export class FluidDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc,
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc,
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
