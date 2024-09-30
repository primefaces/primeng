import { Component } from '@angular/core';
import { ReactiveFormsDoc } from '@doc/slider/reactiveformsdoc';
import { AccessibilityDoc } from '@doc/slider/accessibilitydoc';
import { BasicDoc } from '@doc/slider/basicdoc';
import { ImportDoc } from '@doc/slider/importdoc';
import { InputDoc } from '@doc/slider/inputdoc';
import { RangeDoc } from '@doc/slider/rangedoc';
import { StepDoc } from '@doc/slider/stepdoc';
import { VerticalDoc } from '@doc/slider/verticaldoc';
import { SliderDocModule } from '@doc/slider/sliderdoc.module';
import { FilterDoc } from '@doc/slider/filterdoc';

@Component({
    template: `<app-doc
        docTitle="Angular Slider Component"
        header="Slider"
        description="Slider is a component to provide input with a drag handle."
        [docs]="docs"
        [apiDocs]="['Slider']"
        themeDocs="slider"
    ></app-doc>`,
    standalone: true,
    imports: [SliderDocModule],
    styleUrl: './sliderdemo.scss',
})
export class SliderDemo {
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
            id: 'reactive-forms',
            label: 'Reactive Forms',
            component: ReactiveFormsDoc,
        },
        {
            id: 'input',
            label: 'Input',
            component: InputDoc,
        },
        {
            id: 'step',
            label: 'Step',
            component: StepDoc,
        },
        {
            id: 'range',
            label: 'Range',
            component: RangeDoc,
        },
        {
            id: 'filter',
            label: 'Filter',
            component: FilterDoc,
        },
        {
            id: 'vertical',
            label: 'Vertical',
            component: VerticalDoc,
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
