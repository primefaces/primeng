import { AppDocSection } from '@/components/doc/app.docsection';
import { AppDocSectionNav } from '@/components/doc/app.docsection-nav';
import { AddingPrimeIconsDoc } from '@/doc/uikit/common/addingprimeicons-doc';
import { CollectionsDoc } from '@/doc/uikit/v4/collections-doc';
import { ComponentsDoc } from '@/doc/uikit/v4/faq/components-doc';
import { LicenceDoc } from '@/doc/uikit/common/faq/license-doc';
import { RoadmapDoc } from '@/doc/uikit/common/faq/roadmap-doc';
import { UpdatesDoc } from '@/doc/uikit/v4/faq/updates-doc';
import { UsageDoc } from '@/doc/uikit/v4/faq/usage-doc';
import { OverviewDoc } from '@/doc/uikit/common/overview-doc';
import { ImportantNoticeDoc } from '@/doc/uikit/v4/importantnotice-doc';
import { EnablingDoc } from '@/doc/uikit/common/installation/enabling-doc';
import { ImportingDoc } from '@/doc/uikit/common/installation/importing-doc';
import { PublishingDoc } from '@/doc/uikit/common/installation/publishing-doc';
import { LimitationsDoc } from '@/doc/uikit/v4/limitations-doc';
import { ResourcesDoc } from '@/doc/uikit/v4/resources-doc';
import { SupportDoc } from '@/doc/uikit/common/support-doc';
import { UpdatePrimeOneDoc } from '@/doc/uikit/common/updateprimeone-doc';
import { CIPipelineDoc } from '@/doc/uikit/v4/cipipeline-doc';
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
                    <h1>PrimeOne Guide | 4.0</h1>
                    <p>PrimeOne is a strong UI component library gets even better with a great Figma UI Kit. That's what PrimeOne is PrimeTek's official Figma UI Kit, built to work seamlessly with the Prime UI Suites.</p>
                </div>
                <app-docsection [docs]="docs" />
            </div>
            <app-docsection-nav [docs]="docs" />
        </div>
    `
})
export class UIKitV4Demo {
    docs = [
        {
            id: 'overview',
            label: 'Overview',
            component: OverviewDoc
        },
        {
            id: 'important-notice',
            label: 'Important Notice',
            component: ImportantNoticeDoc
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
            id: 'collections',
            label: 'Collections',
            component: CollectionsDoc
        },
        {
            id: 'ci-pipeline',
            label: 'CI Pipeline',
            component: CIPipelineDoc
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
            id: 'limitations',
            label: 'Limitations',
            component: LimitationsDoc
        },
        {
            id: 'support',
            label: 'Support',
            component: SupportDoc
        }
    ];
}
