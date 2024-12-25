import { AccessibilityDoc } from '@/doc/button/accessibilitydoc';
import { BadgeDoc } from '@/doc/button/badgedoc';
import { BasicDoc } from '@/doc/button/basicdoc';
import { ButtonDocModule } from '@/doc/button/buttondoc.module';
import { ButtonGroupDoc } from '@/doc/button/buttongroupdoc';
import { DirectiveDoc } from '@/doc/button/directivedoc';
import { DisabledDoc } from '@/doc/button/disableddoc';
import { IconsDoc } from '@/doc/button/iconsdoc';
import { IconOnlyDoc } from '@/doc/button/iconsonlydoc';
import { ImportDoc } from '@/doc/button/importdoc';
import { LinkDoc } from '@/doc/button/linkdoc';
import { LoadingDoc } from '@/doc/button/loadingdoc';
import { OutlinedDoc } from '@/doc/button/outlineddoc';
import { RaisedDoc } from '@/doc/button/raiseddoc';
import { RaisedTextDoc } from '@/doc/button/raisedtextdoc';
import { RoundedDoc } from '@/doc/button/roundeddoc';
import { SeverityDoc } from '@/doc/button/severitydoc';
import { SizesDoc } from '@/doc/button/sizesdoc';
import { TemplateDoc } from '@/doc/button/templatedoc';
import { TextDoc } from '@/doc/button/textdoc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [ButtonDocModule],
    template: `
        <app-doc docTitle="Angular Button Component" header="Button" description="Button is an extension to standard button element with icons and theming." [docs]="docs" [apiDocs]="['Button', 'ButtonDirective']" themeDocs="button"></app-doc>
    `
})
export class ButtonDemo {
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
            id: 'directive',
            label: 'Directive',
            component: DirectiveDoc
        },
        {
            id: 'link',
            label: 'Link',
            component: LinkDoc
        },
        {
            id: 'icons',
            label: 'Icons',
            component: IconsDoc
        },
        {
            id: 'loading',
            label: 'Loading',
            component: LoadingDoc
        },
        {
            id: 'severity',
            label: 'Severity',
            component: SeverityDoc
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc
        },
        {
            id: 'raised',
            label: 'Raised',
            component: RaisedDoc
        },
        {
            id: 'rounded',
            label: 'Rounded',
            component: RoundedDoc
        },
        {
            id: 'text',
            label: 'Text',
            component: TextDoc
        },
        {
            id: 'raisedtext',
            label: 'Raised Text',
            component: RaisedTextDoc
        },
        {
            id: 'outlined',
            label: 'Outlined',
            component: OutlinedDoc
        },
        {
            id: 'icononly',
            label: 'Icon Only',
            component: IconOnlyDoc
        },
        {
            id: 'badge',
            label: 'Badge',
            component: BadgeDoc
        },
        {
            id: 'buttongroup',
            label: 'Button Group',
            component: ButtonGroupDoc
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
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
