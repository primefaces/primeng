import { AppDocSection } from '@/components/doc/app.docsection';
import { AppDocSectionNav } from '@/components/doc/app.docsection-nav';
import { AddingPrimeIconsDoc } from '@/doc/uikit/common/addingprimeicons-doc';
import { OverviewDoc } from '@/doc/uikit/common/overview-doc';
import { ComponentsDoc } from '@/doc/uikit/common/faq/components-doc';
import { LicenceDoc } from '@/doc/uikit/common/faq/license-doc';
import { RoadmapDoc } from '@/doc/uikit/common/faq/roadmap-doc';
import { UpdatesDoc } from '@/doc/uikit/common/faq/updates-doc';
import { UsageDoc } from '@/doc/uikit/common/faq/usage-doc';
import { EnablingDoc } from '@/doc/uikit/common/installation/enabling-doc';
import { ImportingDoc } from '@/doc/uikit/common/installation/importing-doc';
import { PublishingDoc } from '@/doc/uikit/common/installation/publishing-doc';
import { ResourcesDoc } from '@/doc/uikit/v3/resources-doc';
import { SupportDoc } from '@/doc/uikit/common/support-doc';
import { UpdatePrimeOneDoc } from '@/doc/uikit/common/updateprimeone-doc';
import { TokensStudioSetupDoc } from '@/doc/uikit/v3/workflow/tokensstudiosetup-doc';
import { DesignChangesDoc } from '@/doc/uikit/v3/workflow/designchanges-doc';
import { TokenSetsDoc } from '@/doc/uikit/v3/tokensets-doc';
import { TokensDoc } from '@/doc/uikit/v3/faq/tokens-doc';
import { CIPipelineDoc } from '@/doc/uikit/v3/workflow/cipipeline-doc';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';

@Component({
    standalone: true,
    imports: [CommonModule, AppDocSectionNav, AppDocSection, RippleModule, RouterModule],
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
export class UIKitV3Demo {
    docs = [
        {
            id: 'overview',
            label: 'Overview',
            component: OverviewDoc
        },
        {
            id: 'resources',
            label: 'Resources',
            component: ResourcesDoc
        },
        {
            id: 'installation',
            label: 'Installation',
            children: [
                {
                    id: 'importing',
                    label: 'Importing',
                    component: ImportingDoc
                },
                {
                    id: 'publishing',
                    label: 'Publishing',
                    component: PublishingDoc
                },
                {
                    id: 'enabling',
                    label: 'Enabling',
                    component: EnablingDoc
                }
            ]
        },
        {
            id: 'suggested-workflow',
            label: 'Suggested Workflow',
            description:
                "PrimeOne uses Tokens Studio as its primary tool for design token management. To leverage the benefits of Figma Variables, these variables have also been exported from Tokens Studio and included in the file. This setup, while powerful, can make design changes somewhat complex and less fluid due to the way the tools interact. Although the provided guide outlines the recommended steps, we acknowledge that the workflow may feel unintuitive or slow at times. We’re actively exploring improvements, and in the meantime, suggest following the guide as a baseline while adapting it to your team's needs where necessary.",
            children: [
                {
                    id: 'tokens-studio-setup',
                    label: 'Tokens Studio Setup',
                    component: TokensStudioSetupDoc
                },
                {
                    id: 'ci-pipeline',
                    label: 'CI Pipeline',
                    component: CIPipelineDoc
                },
                {
                    id: 'designchanges',
                    label: 'Design Changes',
                    component: DesignChangesDoc
                }
            ]
        },
        {
            id: 'tokensets',
            label: 'Token Sets',
            component: TokenSetsDoc
        },
        {
            id: 'update-primeone',
            label: 'Update PrimeOne',
            component: UpdatePrimeOneDoc
        },
        {
            id: 'adding-primeicons',
            label: 'Adding PrimeIcons',
            component: AddingPrimeIconsDoc
        },
        {
            id: 'faq',
            label: 'FAQ',
            children: [
                {
                    id: 'usage',
                    label: 'Usage',
                    component: UsageDoc
                },
                {
                    id: 'components',
                    label: 'Components',
                    component: ComponentsDoc
                },
                {
                    id: 'tokens',
                    label: 'Tokens',
                    component: TokensDoc
                },
                {
                    id: 'updates',
                    label: 'Updates',
                    component: UpdatesDoc
                },
                {
                    id: 'roadmap',
                    label: 'Roadmap',
                    component: RoadmapDoc
                },
                {
                    id: 'licence',
                    label: 'Licence',
                    component: LicenceDoc
                }
            ]
        },
        {
            id: 'support',
            label: 'Support',
            component: SupportDoc
        }
    ];
}
