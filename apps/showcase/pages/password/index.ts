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
import { PasswordDocModule } from '@/doc/password/passworddoc.module';
import { ReactiveFormsDoc } from '@/doc/password/reactiveformsdoc';
import { SizesDoc } from '@/doc/password/sizesdoc';
import { TemplateDoc } from '@/doc/password/templatedoc';
import { TemplateDrivenFormsDoc } from '@/doc/password/templatedrivenformsdoc';
import { ToggleMaskDoc } from '@/doc/password/togglemaskdoc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Angular Password Component" header="Password" description="Password displays strength indicator for password fields." [docs]="docs" [apiDocs]="['Password', 'PasswordDirective']" themeDocs="password"></app-doc>`,
    standalone: true,
    imports: [PasswordDocModule]
})
export class PasswordDemo {
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
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc
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
