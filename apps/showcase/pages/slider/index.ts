import { AccessibilityDoc } from '@/doc/slider/accessibility-doc';
import { BasicDoc } from '@/doc/slider/basic-doc';
import { FilterDoc } from '@/doc/slider/filter-doc';
import { ImportDoc } from '@/doc/slider/import-doc';
import { InputDoc } from '@/doc/slider/input-doc';
import { PTComponent } from '@/doc/slider/pt/PTComponent';
import { RangeDoc } from '@/doc/slider/range-doc';
import { ReactiveFormsDoc } from '@/doc/slider/reactiveforms-doc';
import { StepDoc } from '@/doc/slider/step-doc';
import { TemplateDrivenFormsDoc } from '@/doc/slider/templatedrivenforms-doc';
import { VerticalDoc } from '@/doc/slider/vertical-doc';
import { AppDoc } from '@/components/doc/app.doc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular Slider Component" header="Slider" description="Slider is a component to provide input with a drag handle." [docs]="docs" [apiDocs]="['Slider']" themeDocs="slider" [ptDocs]="ptComponent"></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class SliderDemo {
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
            id: 'input',
            label: 'Input',
            component: InputDoc
        },
        {
            id: 'step',
            label: 'Step',
            component: StepDoc
        },
        {
            id: 'range',
            label: 'Range',
            component: RangeDoc
        },
        {
            id: 'filter',
            label: 'Filter',
            component: FilterDoc
        },
        {
            id: 'vertical',
            label: 'Vertical',
            component: VerticalDoc
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
