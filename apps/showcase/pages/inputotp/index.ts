import { AccessibilityDoc } from '@/doc/inputotp/accessibilitydoc';
import { BasicDoc } from '@/doc/inputotp/basicdoc';
import { ImportDoc } from '@/doc/inputotp/importdoc';
import { IntegerOnlyDoc } from '@/doc/inputotp/integeronlydoc';
import { MaskDoc } from '@/doc/inputotp/maskdoc';
import { ReactiveFormsDoc } from '@/doc/inputotp/reactiveformsdoc';
import { SampleDoc } from '@/doc/inputotp/sampledoc';
import { SizesDoc } from '@/doc/inputotp/sizesdoc';
import { TemplateDoc } from '@/doc/inputotp/templatedoc';
import { TemplateDrivenFormsDoc } from '@/doc/inputotp/templatedrivenformsdoc';
import { PTComponent } from '@/doc/inputotp/pt/PTComponent';
import { Component, ViewEncapsulation } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular Otp Input Component" header="InputOtp" description="Input Otp is used to enter one time passwords." [docs]="docs" [ptDocs]="ptComponent" [apiDocs]="['InputOtp']" themeDocs="inputotp"></app-doc> `,
    encapsulation: ViewEncapsulation.None
})
export class InputOtpDemo {
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
            id: 'mask',
            label: 'Mask',
            component: MaskDoc
        },
        {
            id: 'integeronly',
            label: 'Integer Only',
            component: IntegerOnlyDoc
        },
        {
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
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
            id: 'sample',
            label: 'Sample',
            component: SampleDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
