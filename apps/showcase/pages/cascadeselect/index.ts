import { AccessibilityDoc } from '@/doc/cascadeselect/accessibility-doc';
import { BasicDoc } from '@/doc/cascadeselect/basic-doc';
import { DisabledDoc } from '@/doc/cascadeselect/disabled-doc';
import { FilledDoc } from '@/doc/cascadeselect/filled-doc';
import { FloatLabelDoc } from '@/doc/cascadeselect/floatlabel-doc';
import { IftaLabelDoc } from '@/doc/cascadeselect/iftalabel-doc';
import { ImportDoc } from '@/doc/cascadeselect/import-doc';
import { InvalidDoc } from '@/doc/cascadeselect/invalid-doc';
import { LoadingDoc } from '@/doc/cascadeselect/loading-doc';
import { ReactiveFormsDoc } from '@/doc/cascadeselect/reactiveforms-doc';
import { SizesDoc } from '@/doc/cascadeselect/sizes-doc';
import { TemplateDoc } from '@/doc/cascadeselect/template-doc';
import { TemplateDrivenFormsDoc } from '@/doc/cascadeselect/templatedrivenforms-doc';
import { FluidDoc } from '@/doc/cascadeselect/fluid-doc';
import { ClearIconDoc } from '@/doc/cascadeselect/clearicon-doc';
import { PTComponent } from '@/doc/cascadeselect/pt/PTComponent';
import { AppDoc } from '@/components/doc/app.doc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc
            docTitle="Angular CascadeSelect Component"
            header="CascadeSelect"
            description="CascadeSelect displays a nested structure of options."
            [docs]="docs"
            [apiDocs]="['CascadeSelect']"
            [ptDocs]="ptComponent"
            themeDocs="CascadeSelect"
        ></app-doc>
    `
})
export class CascadeSelectDemo {
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
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'loading',
            label: 'Loading State',
            component: LoadingDoc
        },
        {
            id: 'float-label',
            label: 'Float Label',
            component: FloatLabelDoc
        },
        {
            id: 'ifta-label',
            label: 'Ifta Label',
            component: IftaLabelDoc
        },
        {
            id: 'clearicon',
            label: 'Clear Icon',
            component: ClearIconDoc
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
