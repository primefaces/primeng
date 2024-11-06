import { Component } from '@angular/core';
import { ReactiveFormsDoc } from '@doc/password/reactiveformsdoc';
import { AccessibilityDoc } from '@doc/password/accessibilitydoc';
import { BasicDoc } from '@doc/password/basicdoc';
import { DisabledDoc } from '@doc/password/disableddoc';
import { FloatLabelDoc } from '@doc/password/floatlabeldoc';
import { ImportDoc } from '@doc/password/importdoc';
import { InvalidDoc } from '@doc/password/invaliddoc';
import { MeterDoc } from '@doc/password/meterdoc';
import { LocaleDoc } from '@doc/password/localedoc';
import { TemplateDoc } from '@doc/password/templatedoc';
import { ToggleMaskDoc } from '@doc/password/togglemaskdoc';
import { FilledDoc } from '@doc/password/filleddoc';
import { PasswordDocModule } from '@doc/password/passworddoc.module';
import { IftaLabelDoc } from '@doc/password/iftalabeldoc';
import { SizesDoc } from '@doc/password/sizesdoc';

@Component({
    template: `<app-doc
        docTitle="Angular Password Component"
        header="Password"
        description="Password displays strength indicator for password fields."
        [docs]="docs"
        [apiDocs]="['Password', 'PasswordDirective']"
        themeDocs="password"
    ></app-doc>`,
    standalone: true,
    imports: [PasswordDocModule],
})
export class PasswordDemo {
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
            id: 'meter',
            label: 'Meter',
            component: MeterDoc,
        },
        {
            id: 'locale',
            label: 'Locale',
            component: LocaleDoc,
        },
        {
            id: 'togglemask',
            label: 'Toggle Mask',
            component: ToggleMaskDoc,
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc,
        },
        {
            id: 'floatlabel',
            label: 'Float Label',
            component: FloatLabelDoc,
        },
        {
            id: 'iftalabel',
            label: 'Ifta Label',
            component: IftaLabelDoc,
        },
        {
            id: 'sizes',
            label: 'Sizes',
            component: SizesDoc,
        },
        {
            id: 'filled',
            label: 'Filled',
            component: FilledDoc,
        },
        {
            id: 'invalid',
            label: 'Invalid',
            component: InvalidDoc,
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc,
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
