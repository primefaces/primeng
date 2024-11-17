import { AccessibilityDoc } from '@/doc/knob/accessibilitydoc';
import { BasicDoc } from '@/doc/knob/basicdoc';
import { ColorDoc } from '@/doc/knob/colordoc';
import { DisabledDoc } from '@/doc/knob/disableddoc';
import { ImportDoc } from '@/doc/knob/importdoc';
import { KnobDocModule } from '@/doc/knob/knobdoc.module';
import { MinMaxDoc } from '@/doc/knob/minmaxdoc';
import { ReactiveDoc } from '@/doc/knob/reactivedoc';
import { ReactiveFormsDoc } from '@/doc/knob/reactiveformsdoc';
import { ReadonlyDoc } from '@/doc/knob/readonlydoc';
import { SizeDoc } from '@/doc/knob/sizedoc';
import { StepDoc } from '@/doc/knob/stepdoc';
import { StrokeDoc } from '@/doc/knob/strokedoc';
import { TemplateDoc } from '@/doc/knob/templatedoc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular Knob Component" header="Knob" description="Knob is a form component to define number inputs with a dial." [docs]="docs" [apiDocs]="['Knob']" themeDocs="knob"></app-doc> `,
    standalone: true,
    imports: [KnobDocModule]
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
            id: 'reactive-forms',
            label: 'Reactive Forms',
            component: ReactiveFormsDoc
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
}
