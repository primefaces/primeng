import { AccessibilityDoc } from '@/doc/inputotp/accessibilitydoc';
import { BasicDoc } from '@/doc/inputotp/basicdoc';
import { ImportDoc } from '@/doc/inputotp/importdoc';
import { InputOtpDocModule } from '@/doc/inputotp/inputotpdoc.module';
import { IntegerOnlyDoc } from '@/doc/inputotp/integeronlydoc';
import { MaskDoc } from '@/doc/inputotp/maskdoc';
import { SampleDoc } from '@/doc/inputotp/sampledoc';
import { SizesDoc } from '@/doc/inputotp/sizesdoc';
import { TemplateDoc } from '@/doc/inputotp/templatedoc';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    standalone: true,
    imports: [InputOtpDocModule],
    template: ` <app-doc docTitle="Angular Otp Input Component" header="InputOtp" description="Input Otp is used to enter one time passwords." [docs]="docs" [apiDocs]="['InputOtp']" themeDocs="inputotp"></app-doc> `,
    encapsulation: ViewEncapsulation.None
})
export class InputOtpDemo {
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
