import { Component, ViewEncapsulation } from '@angular/core';
import { ImportDoc } from '@doc/inputotp/importdoc';
import { BasicDoc } from '@doc/inputotp/basicdoc';
import { MaskDoc } from '@doc/inputotp/maskdoc';
import { IntegerOnlyDoc } from '@doc/inputotp/integeronlydoc';
import { TemplateDoc } from '@doc/inputotp/templatedoc';
import { SampleDoc } from '@doc/inputotp/sampledoc';
import { AccessibilityDoc } from '@doc/inputotp/accessibilitydoc';
import { InputOtpDocModule } from '@doc/inputotp/inputotpdoc.module';
import { SizesDoc } from '@doc/inputotp/sizesdoc';

@Component({
    standalone: true,
    imports: [InputOtpDocModule],
    template: `
        <app-doc
            docTitle="Angular Otp Input Component"
            header="InputOtp"
            description="Input Otp is used to enter one time passwords."
            [docs]="docs"
            [apiDocs]="['InputOtp']"
            themeDocs="inputotp"
        ></app-doc>
    `,
    encapsulation: ViewEncapsulation.None,
})
export class InputOtpDemo {
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
            id: 'mask',
            label: 'Mask',
            component: MaskDoc,
        },
        {
            id: 'integeronly',
            label: 'Integer Only',
            component: IntegerOnlyDoc,
        },
        {
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc,
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc,
        },
        {
            id: 'sample',
            label: 'Sample',
            component: SampleDoc,
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
