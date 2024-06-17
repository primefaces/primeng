import { Component, ViewEncapsulation } from '@angular/core';
import { ImportDoc } from '@doc/inputotp/importdoc';
import { BasicDoc } from '@doc/inputotp/basicdoc';
import { MaskDoc } from '@doc/inputotp/maskdoc';
import { IntegerOnlyDoc } from '@doc/inputotp/integeronlydoc';
import { TemplateDoc } from '@doc/inputotp/templatedoc';
import { SampleDoc } from '@doc/inputotp/sampledoc';
import { AccessibilityDoc } from '@doc/inputotp/accessibilitydoc';

@Component({
    templateUrl: './inputotp.html',
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
