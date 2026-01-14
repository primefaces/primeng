import { AccessibilityDoc } from '@/doc/button/accessibility-doc';
import { BadgeDoc } from '@/doc/button/badge-doc';
import { BasicDoc } from '@/doc/button/basic-doc';
import { ButtonGroupDoc } from '@/doc/button/buttongroup-doc';
import { DirectiveDoc } from '@/doc/button/directive-doc';
import { DisabledDoc } from '@/doc/button/disabled-doc';
import { IconsDoc } from '@/doc/button/icons-doc';
import { IconOnlyDoc } from '@/doc/button/iconsonly-doc';
import { ImportDoc } from '@/doc/button/import-doc';
import { LinkDoc } from '@/doc/button/link-doc';
import { LoadingDoc } from '@/doc/button/loading-doc';
import { OutlinedDoc } from '@/doc/button/outlined-doc';
import { RaisedDoc } from '@/doc/button/raised-doc';
import { RaisedTextDoc } from '@/doc/button/raisedtext-doc';
import { RoundedDoc } from '@/doc/button/rounded-doc';
import { SeverityDoc } from '@/doc/button/severity-doc';
import { SizesDoc } from '@/doc/button/sizes-doc';
import { TemplateDoc } from '@/doc/button/template-doc';
import { TextDoc } from '@/doc/button/text-doc';
import { AppDoc } from '@/components/doc/app.doc';
import { Component } from '@angular/core';
import { PTComponent } from '@/doc/button/pt/PTComponent';
@Component({
    standalone: true,
    imports: [AppDoc],
    template: `
        <app-doc
            docTitle="Angular Button Component"
            header="Button"
            description="Button is an extension to standard button element with icons and theming."
            [docs]="docs"
            [apiDocs]="['Button', 'ButtonDirective']"
            themeDocs="button"
            [ptDocs]="ptComponent"
        ></app-doc>
    `
})
export class ButtonDemo {
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
