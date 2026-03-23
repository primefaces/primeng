import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/tabs/accessibility-doc';
import { BasicDoc } from '@/doc/tabs/basic-doc';
import { ControlledDoc } from '@/doc/tabs/controlled-doc';
import { TemplateDoc } from '@/doc/tabs/customtemplate-doc';
import { DisabledDoc } from '@/doc/tabs/disabled-doc';
import { DynamicDoc } from '@/doc/tabs/dynamic-doc';
import { ImportDoc } from '@/doc/tabs/import-doc';
import { LazyDoc } from '@/doc/tabs/lazy-doc';
import { PTComponent } from '@/doc/tabs/pt/PTComponent';
import { ScrollableDoc } from '@/doc/tabs/scrollable-doc';
import { TabmenuDoc } from '@/doc/tabs/tabmenu-doc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular Tabs Component" header="Tabs" description="Tabs is a container component to group content with tabs." [docs]="docs" [apiDocs]="['Tabs']" [ptDocs]="ptComponent" themeDocs="tabs"></app-doc>`,
    imports: [AppDoc],
    standalone: true
})
export class TabsDemo {
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
            id: 'dynamic',
            label: 'Dynamic',
            component: DynamicDoc
        },
        {
            id: 'controlled',
            label: 'Controlled',
            component: ControlledDoc
        },
        {
            id: 'scrollable',
            label: 'Scrollable',
            component: ScrollableDoc
        },
        {
            id: 'lazy',
            label: 'Lazy',
            component: LazyDoc
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'tabmenu',
            label: 'Tab Menu',
            component: TabmenuDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
