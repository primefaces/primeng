import { BasicDoc } from '@/doc/inputcolor/basic-doc';
import { AdvancedDoc } from '@/doc/inputcolor/advanced-doc';
import { ControlledDoc } from '@/doc/inputcolor/controlled-doc';
import { VerticalSliderDoc } from '@/doc/inputcolor/verticalslider-doc';
import { PopoverDoc } from '@/doc/inputcolor/popover-doc';
import { ReactiveFormsDoc } from '@/doc/inputcolor/reactiveforms-doc';
import { TemplateDrivenFormsDoc } from '@/doc/inputcolor/templatedrivenforms-doc';
import { AppDoc } from '@/components/doc/app.doc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular InputColor Component" header="InputColor" description="InputColor is a composable color picker component." [docs]="docs" [heroDoc]="heroDoc" [apiDocs]="['InputColor']" themeDocs="inputcolor"></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class InputColorDemo {
    heroDoc = BasicDoc;

    docs = [
        {
            id: 'examples',
            label: 'Examples',
            children: [
                {
                    id: 'basic',
                    label: 'Basic',
                    component: BasicDoc
                },
                {
                    id: 'popover',
                    label: 'Popover',
                    component: PopoverDoc
                },
                {
                    id: 'vertical-slider',
                    label: 'Vertical Slider',
                    component: VerticalSliderDoc
                },
                {
                    id: 'controlled',
                    label: 'Controlled',
                    component: ControlledDoc
                },
                {
                    id: 'advanced',
                    label: 'Advanced',
                    component: AdvancedDoc
                },
                {
                    id: 'forms',
                    label: 'Forms',
                    children: [
                        { id: 'templatedriven', label: 'Template Driven', component: TemplateDrivenFormsDoc },
                        { id: 'reactive', label: 'Reactive Forms', component: ReactiveFormsDoc }
                    ]
                }
            ]
        }
    ];
}
