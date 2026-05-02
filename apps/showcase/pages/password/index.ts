import { AccessibilityDoc } from '@/doc/password/accessibility-doc';
import { BasicDoc } from '@/doc/password/basic-doc';
import { DisabledDoc } from '@/doc/password/disabled-doc';
import { FilledDoc } from '@/doc/password/filled-doc';
import { FloatLabelDoc } from '@/doc/password/floatlabel-doc';
import { IftaLabelDoc } from '@/doc/password/iftalabel-doc';
import { ImportDoc } from '@/doc/password/import-doc';
import { InvalidDoc } from '@/doc/password/invalid-doc';
import { LocaleDoc } from '@/doc/password/locale-doc';
import { MeterDoc } from '@/doc/password/meter-doc';
import { ReactiveFormsDoc } from '@/doc/password/reactiveforms-doc';
import { SizesDoc } from '@/doc/password/sizes-doc';
import { TemplateDoc } from '@/doc/password/template-doc';
import { TemplateDrivenFormsDoc } from '@/doc/password/templatedrivenforms-doc';
import { ToggleMaskDoc } from '@/doc/password/togglemask-doc';
import { FluidDoc } from '@/doc/password/fluid-doc';
import { ClearIconDoc } from '@/doc/password/clearicon-doc';
import { PTComponent } from '@/doc/password/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc
        docTitle="Angular Password Component"
        header="Password"
        description="Password displays strength indicator for password fields."
        [docs]="docs"
        [apiDocs]="['Password', 'PasswordDirective']"
        [ptDocs]="ptComponent"
        themeDocs="password"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc]
})
export class PasswordDemo {
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
            id: 'meter',
            label: 'Meter',
            component: MeterDoc
        },
        {
            id: 'locale',
            label: 'Locale',
            component: LocaleDoc
        },
        {
            id: 'togglemask',
            label: 'Toggle Mask',
            component: ToggleMaskDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'floatlabel',
            label: 'Float Label',
            component: FloatLabelDoc
        },
        {
            id: 'iftalabel',
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
