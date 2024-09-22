import { Component } from '@angular/core';
import { DisabledDoc } from '@doc/tabs/disableddoc';
import { BasicDoc } from '@doc/tabs/basicdoc';
import { DynamicDoc } from '@doc/tabs/dynamicdoc';
import { ControlledDoc } from '@doc/tabs/controlleddoc';
import { ImportDoc } from '@doc/tabs/importdoc';
import { TemplateDoc } from '@doc/tabs/customtemplatedoc';
import { ClosableDoc } from '@doc/tabs/closabledoc';
import { ScrollableDoc } from '@doc/tabs/scrollabledoc';
import { LazyDoc } from '@doc/tabs/lazydoc';
import { AccessibilityDoc } from '@doc/tabs/accessibilitydoc';
import { TabsDocModule } from '@doc/tabs/tabsdoc.module';

@Component({
    template: `<app-doc
        docTitle="Angular Tabs Component"
        header="Tabs"
        description="Tabs is a container component to group content with tabs."
        [docs]="docs"
        [apiDocs]="['Tabs', 'TabPanel']"
        themeDocs="tabs"
    ></app-doc>`,
    imports: [TabsDocModule],
    standalone: true,
})
export class TabsDemo {
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
            id: 'dynamic',
            label: 'Dynamic',
            component: DynamicDoc,
        },
        {
            id: 'controlled',
            label: 'Controlled',
            component: ControlledDoc,
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc,
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc,
        },
        {
            id: 'closable',
            label: 'Closable',
            component: ClosableDoc,
        },
        {
            id: 'scrollable',
            label: 'Scrollable',
            component: ScrollableDoc,
        },
        {
            id: 'lazy',
            label: 'Lazy',
            component: LazyDoc,
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
