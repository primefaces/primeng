import { AccessibilityDoc } from '@/doc/password/accessibilitydoc';
import { BasicDoc } from '@/doc/password/basicdoc';
import { DisabledDoc } from '@/doc/password/disableddoc';
import { FilledDoc } from '@/doc/password/filleddoc';
import { FloatLabelDoc } from '@/doc/password/floatlabeldoc';
import { IftaLabelDoc } from '@/doc/password/iftalabeldoc';
import { ImportDoc } from '@/doc/password/importdoc';
import { InvalidDoc } from '@/doc/password/invaliddoc';
import { LocaleDoc } from '@/doc/password/localedoc';
import { MeterDoc } from '@/doc/password/meterdoc';
import { ReactiveFormsDoc } from '@/doc/password/reactiveformsdoc';
import { SizesDoc } from '@/doc/password/sizesdoc';
import { TemplateDoc } from '@/doc/password/templatedoc';
import { TemplateDrivenFormsDoc } from '@/doc/password/templatedrivenformsdoc';
import { ToggleMaskDoc } from '@/doc/password/togglemaskdoc';
import { FluidDoc } from '@/doc/password/fluiddoc';
import { ClearIconDoc } from '@/doc/password/clearicondoc';
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
