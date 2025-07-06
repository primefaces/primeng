import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { AddingPrimeIconsDoc } from '@/doc/uikit/addingprimeiconsdoc';
import { ComponentsDoc } from '@/doc/uikit/faq/componentsdoc';
import { DesignChangesDoc } from '@/doc/uikit/workflow/designchangesdoc';
import { EnablingDoc } from '@/doc/uikit/installation/enablingdoc';
import { GuideOverviewDoc } from '@/doc/uikit/guideoverviewdoc';
import { ImportingDoc } from '@/doc/uikit/installation/importingdoc';
import { LicenceDoc } from '@/doc/uikit/faq/licensedoc';
import { PublishingDoc } from '@/doc/uikit/installation/publishingdoc';
import { ResourcesDoc } from '@/doc/uikit/resourcesdoc';
import { RoadmapDoc } from '@/doc/uikit/faq/roadmapdoc';
import { SupportDoc } from '@/doc/uikit/supportdoc';
import { TokensDoc } from '@/doc/uikit/faq/tokensdoc';
import { TokenSetsDoc } from '@/doc/uikit/tokensetsdoc';
import { TokensStudioSetupDoc } from '@/doc/uikit/workflow/tokensstudiosetupdoc';
import { UpdatePrimeOneDoc } from '@/doc/uikit/updateprimeonedoc';
import { UpdatesDoc } from '@/doc/uikit/faq/updatesdoc';
import { UsageDoc } from '@/doc/uikit/faq/usagedoc';

@Component({
    standalone: true,
    imports: [CommonModule, AppDocModule, RippleModule, RouterModule],
    template: `
        <div class="doc">
            <div class="doc-main">
                <div class="doc-intro">
                    <h1>PrimeOne Guide</h1>
                    <p>PrimeOne is a strong UI component library gets even better with a great Figma UI Kit. That's what PrimeOne is PrimeTek's official Figma UI Kit, built to work seamlessly with the Prime UI Suites.</p>
                </div>
                <app-docsection [docs]="docs" />
            </div>
            <app-docsection-nav [docs]="docs" />
        </div>
    `
})
export class UIKitDemo {
    docs = [
        {
            id: 'overview-demo',
            label: 'Overview',
            component: GuideOverviewDoc
        },
        {
            id: 'resources-demo',
            label: 'Resources',
            component: ResourcesDoc
        },
        {
            id: 'installation-demo',
            label: 'Installation',
            children: [
                {
                    id: 'importing-demo',
                    label: 'Importing',
                    component: ImportingDoc
                },
                {
                    id: 'publishing-demo',
                    label: 'Publishing',
                    component: PublishingDoc
                },
                {
                    id: 'enabling-demo',
                    label: 'Enabling',
                    component: EnablingDoc
                }
            ]
        },
        {
            id: 'workflow-demo',
            label: 'Suggested Workflow',
            description:
                "PrimeOne uses Tokens Studio as its primary tool for design token management. To leverage the benefits of Figma Variables, these variables have also been exported from Tokens Studio and included in the file. This setup, while powerful, can make design changes somewhat complex and less fluid due to the way the tools interact. Although the provided guide outlines the recommended steps, we acknowledge that the workflow may feel unintuitive or slow at times. We’re actively exploring improvements, and in the meantime, suggest following the guide as a baseline while adapting it to your team's needs where necessary.",
            children: [
                {
                    id: 'tokens-studio-setup-demo',
                    label: 'Tokens Studio Setup',
                    component: TokensStudioSetupDoc
                },
                {
                    id: 'design-changes-demo',
                    label: 'Design Changes',
                    component: DesignChangesDoc
                }
            ]
        },
        {
            id: 'token-sets',
            label: 'Token Sets',
            component: TokenSetsDoc
        },
        {
            id: 'update-prime-one',
            label: 'Update PrimeOne',
            component: UpdatePrimeOneDoc
        },
        {
            id: 'adding-prime-icons',
            label: 'Adding PrimeIcons',
            component: AddingPrimeIconsDoc
        },
        {
            id: 'faq-demo',
            label: 'FAQ',
            children: [
                {
                    id: 'usage-demo',
                    label: 'Usage',
                    component: UsageDoc
                },
                {
                    id: 'components-demo',
                    label: 'Components',
                    component: ComponentsDoc
                },
                {
                    id: 'tokens-demo',
                    label: 'Tokens',
                    component: TokensDoc
                },
                {
                    id: 'updates-demo',
                    label: 'Updates',
                    component: UpdatesDoc
                },
                {
                    id: 'roadmap-demo',
                    label: 'Roadmap',
                    component: RoadmapDoc
                },
                {
                    id: 'license-demo',
                    label: 'License',
                    component: LicenceDoc
                }
            ]
        },
        {
            id: 'support-demo',
            label: 'Support',
            component: SupportDoc
        }
    ];
}
