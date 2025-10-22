import { AppDoc } from '@/components/doc/app.doc';
import { AccessibilityDoc } from '@/doc/tree/accessibilitydoc';
import { BasicDoc } from '@/doc/tree/basicdoc';
import { CheckboxDoc } from '@/doc/tree/checkboxdoc';
import { ContextMenuDoc } from '@/doc/tree/contextmenudoc';
import { ControlledDoc } from '@/doc/tree/controlleddoc';
import { DragDropDoc } from '@/doc/tree/dragdropdoc';
import { EventDoc } from '@/doc/tree/eventdoc';
import { FilterDoc } from '@/doc/tree/filterdoc';
import { ImportDoc } from '@/doc/tree/importdoc';
import { LazyDoc } from '@/doc/tree/lazydoc';
import { MultipleDoc } from '@/doc/tree/multipledoc';
import { PTComponent } from '@/doc/tree/pt/PTComponent';
import { SingleDoc } from '@/doc/tree/singledoc';
import { TemplateDoc } from '@/doc/tree/templatedoc';
import { VirtualScrollDoc } from '@/doc/tree/virtualscrolldoc';
import { LazyVirtualScrollDoc } from '@/doc/tree/virtualscrolllazydoc';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular Tree Component" header="Tree" description="Tree is used to display hierarchical data." [docs]="docs" [apiDocs]="['Tree', 'TreeNode']" [ptDocs]="ptComponent" themeDocs="tree"></app-doc>`,
    standalone: true,
    imports: [AppDoc],
    changeDetection: ChangeDetectionStrategy.OnPush
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
