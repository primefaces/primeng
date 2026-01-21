import { AccessibilityDoc } from '@/doc/textarea/accessibility-doc';
import { AutoResizeDoc } from '@/doc/textarea/autoresize-doc';
import { BasicDoc } from '@/doc/textarea/basic-doc';
import { DisabledDoc } from '@/doc/textarea/disabled-doc';
import { FilledDoc } from '@/doc/textarea/filled-doc';
import { FloatlabelDoc } from '@/doc/textarea/floatlabel-doc';
import { IftaLabelDoc } from '@/doc/textarea/iftalabel-doc';
import { ImportDoc } from '@/doc/textarea/import-doc';
import { InvalidDoc } from '@/doc/textarea/invalid-doc';
import { ReactiveFormsDoc } from '@/doc/textarea/reactiveforms-doc';
import { SizesDoc } from '@/doc/textarea/sizes-doc';
import { TemplateDrivenFormsDoc } from '@/doc/textarea/templatedrivenforms-doc';
import { FluidDoc } from '@/doc/textarea/fluid-doc';
import { PTComponent } from '@/doc/textarea/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `<app-doc
        docTitle="Angular Textarea Component"
        header="Textarea"
        description="Textarea adds styling and autoResize functionality to standard textarea element."
        [docs]="docs"
        [apiDocs]="['Textarea']"
        [ptDocs]="ptComponent"
        themeDocs="textearea"
    ></app-doc>`
})
export class TextareaDemo {
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
            id: 'autoresize',
            label: 'AutoResize',
            component: AutoResizeDoc
        },
        {
            id: 'floatlabel',
            label: 'Float Label',
            component: FloatlabelDoc
        },
        {
            id: 'iftalabel',
            label: 'Ifta Label',
            component: IftaLabelDoc
        },
        {
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc
        },
        {
            id: 'fluid',
            label: 'Fluid',
            component: FluidDoc
        },
        {
            id: 'filled',
            label: 'Filled',
            component: FilledDoc
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
        },
        {
            id: 'invalid',
            label: 'Invalid',
            component: InvalidDoc
        },
        {
            id: 'forms',
            label: 'Forms',
            children: [
                { id: 'templatedriven', label: 'Template Driven', component: TemplateDrivenFormsDoc },
                { id: 'reactive', label: 'Reactive Forms', component: ReactiveFormsDoc }
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
