import { Component } from '@angular/core';
import { ImportDoc } from '@doc/tree/importdoc';
import { BasicDoc } from '@doc/tree/basicdoc';
import { ControlledDoc } from '@doc/tree/controlleddoc';
import { SingleDoc } from '@doc/tree/singledoc';
import { MultipleDoc } from '@doc/tree/multipledoc';
import { CheckboxDoc } from '@doc/tree/checkboxdoc';
import { EventDoc } from '@doc/tree/eventdoc';
import { LazyDoc } from '@doc/tree/lazydoc';
import { TemplateDoc } from '@doc/tree/templatedoc';
import { DragDropDoc } from '@doc/tree/dragdropdoc';
import { ContextMenuDoc } from '@doc/tree/contextmenudoc';
import { FilterDoc } from '@doc/tree/filterdoc';
import { AccessibilityDoc } from '@doc/tree/accessibilitydoc';
import { VirtualScrollDoc } from '@doc/tree/virtualscrolldoc';
import { LazyVirtualScrollDoc } from '@doc/tree/virtualscrolllazydoc';
import { TreeDocModule } from '@doc/tree/treedoc.module';

@Component({
    template: `<app-doc docTitle="Angular Tree Component" header="Tree" description="Tree is used to display hierarchical data." [docs]="docs" [apiDocs]="['Tree', 'TreeNode']" themeDocs="tree"></app-doc>`,
    standalone: true,
    imports: [TreeDocModule]
})
export class TreeDemo {
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
            component: DragDropDoc
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
