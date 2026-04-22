import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/tree/accessibility-doc';
import { BasicDoc } from '@/doc/tree/basic-doc';
import { CheckboxDoc } from '@/doc/tree/checkbox-doc';
import { ContextMenuDoc } from '@/doc/tree/contextmenu-doc';
import { ControlledDoc } from '@/doc/tree/controlled-doc';
import { MultipleDragDropDoc } from '@/doc/tree/dragdrop/multipledragdropdoc';
import { SingleDragDropDoc } from '@/doc/tree/dragdrop/singledragdropdoc';
import { EventDoc } from '@/doc/tree/event-doc';
import { FilterDoc } from '@/doc/tree/filter-doc';
import { ImportDoc } from '@/doc/tree/import-doc';
import { LazyDoc } from '@/doc/tree/lazy-doc';
import { MultipleDoc } from '@/doc/tree/multiple-doc';
import { PTComponent } from '@/doc/tree/pt/PTComponent';
import { SingleDoc } from '@/doc/tree/single-doc';
import { TemplateDoc } from '@/doc/tree/template-doc';
import { VirtualScrollDoc } from '@/doc/tree/virtualscroll-doc';
import { LazyVirtualScrollDoc } from '@/doc/tree/virtualscrolllazy-doc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular Tree Component" header="Tree" description="Tree is used to display hierarchical data." [docs]="docs" [apiDocs]="['Tree', 'TreeNode']" [ptDocs]="ptComponent" themeDocs="tree"></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class TreeDemo {
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
            id: 'controlled',
            label: 'Controlled',
            component: ControlledDoc
        },
        {
            id: 'selection',
            label: 'Selection',
            children: [
                {
                    id: 'single',
                    label: 'Single',
                    component: SingleDoc
                },
                {
                    id: 'multiple',
                    label: 'Multiple',
                    component: MultipleDoc
                },
                {
                    id: 'checkbox',
                    label: 'Checkbox',
                    component: CheckboxDoc
                }
            ]
        },
        {
            id: 'event',
            label: 'Events',
            component: EventDoc
        },
        {
            id: 'lazy',
            label: 'Lazy',
            component: LazyDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'filter',
            label: 'Filter',
            component: FilterDoc
        },
        {
            id: 'virtualscroll',
            label: 'Virtual Scroll',
            children: [
                {
                    id: 'preload',
                    label: 'Preload',
                    component: VirtualScrollDoc
                },
                {
                    id: 'lazyvirtualscroll',
                    label: 'Lazy',
                    component: LazyVirtualScrollDoc
                }
            ]
        },
        {
            id: 'dragdrop',
            label: 'DragDrop',

            children: [
                {
                    id: 'dragdrop-single',
                    label: 'Single',
                    component: SingleDragDropDoc
                },
                {
                    id: 'dragdrop-multiple',
                    label: 'Multiple',
                    component: MultipleDragDropDoc
                }
            ]
        },
        {
            id: 'contextmenu',
            label: 'Context Menu',
            component: ContextMenuDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
