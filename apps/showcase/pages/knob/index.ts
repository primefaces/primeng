import { AccessibilityDoc } from '@/doc/knob/accessibility-doc';
import { BasicDoc } from '@/doc/knob/basic-doc';
import { ColorDoc } from '@/doc/knob/color-doc';
import { DisabledDoc } from '@/doc/knob/disabled-doc';
import { ImportDoc } from '@/doc/knob/import-doc';
import { MinMaxDoc } from '@/doc/knob/minmax-doc';
import { PTComponent } from '@/doc/knob/pt/PTComponent';
import { ReactiveDoc } from '@/doc/knob/reactive-doc';
import { ReactiveFormsDoc } from '@/doc/knob/reactiveforms-doc';
import { ReadonlyDoc } from '@/doc/knob/readonly-doc';
import { SizeDoc } from '@/doc/knob/size-doc';
import { StepDoc } from '@/doc/knob/step-doc';
import { StrokeDoc } from '@/doc/knob/stroke-doc';
import { TemplateDoc } from '@/doc/knob/template-doc';
import { TemplateDrivenFormsDoc } from '@/doc/knob/templatedrivenforms-doc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc docTitle="Angular Knob Component" header="Knob" description="Knob is a form component to define number inputs with a dial." [docs]="docs" [apiDocs]="['Knob']" themeDocs="knob" [ptDocs]="ptComponent"></app-doc> `,
    standalone: true,
    imports: [AppDoc]
})
export class KnobDemo {
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
            id: 'minmax',
            label: 'Min/Max',
            component: MinMaxDoc
        },
        {
            id: 'step',
            label: 'Step',
            component: StepDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'stroke',
            label: 'Stroke',
            component: StrokeDoc
        },
        {
            id: 'size',
            label: 'Size',
            component: SizeDoc
        },
        {
            id: 'color',
            label: 'Color',
            component: ColorDoc
        },
        {
            id: 'reactive',
            label: 'Reactive',
            component: ReactiveDoc
        },
        {
            id: 'readonly',
            label: 'ReadOnly',
            component: ReadonlyDoc
        },
        {
            id: 'forms',
            label: 'Forms',
            children: [
                { id: 'templatedriven', label: 'Template Driven', component: TemplateDrivenFormsDoc },
                { id: 'reactiveforms', label: 'Reactive Forms', component: ReactiveFormsDoc }
            ]
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];

    ptComponent = PTComponent;
}
