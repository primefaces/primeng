import { AccessibilityDoc } from '@/doc/fluid/accessibility-doc';
import { BasicDoc } from '@/doc/fluid/basic-doc';
import { ImportDoc } from '@/doc/fluid/import-doc';
import { PTComponent } from '@/doc/fluid/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Fluid Component" header="Fluid" description="Fluid is a layout component to make descendant components span full width of their container." [docs]="docs" [ptDocs]="ptComponent" themeDocs="fluid"></app-doc> `
})
export class FluidDemo {
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
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
