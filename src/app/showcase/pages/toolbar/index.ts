import { Component } from '@angular/core';
import { ImportDoc } from '@doc/toolbar/importdoc';
import { BasicDoc } from '@doc/toolbar/basicdoc';
import { TemplateDoc } from '@doc/toolbar/templatedoc';
import { AccessibilityDoc } from '@doc/toolbar/accessibilitydoc';
import { ToolbarDocModule } from '@doc/toolbar/toolbardoc.module';

@Component({
    template: `<app-doc
        docTitle="Angular Toolbar Component"
        header="Toolbar"
        description="Toolbar is a grouping component for buttons and other content."
        [docs]="docs"
        [apiDocs]="['Toolbar']"
        themeDocs="toolbar"
    ></app-doc>`,
    standalone: true,
    imports: [ToolbarDocModule],
})
export class ToolbarDemo {
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
            id: 'template',
            label: 'Template',
            component: TemplateDoc,
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
