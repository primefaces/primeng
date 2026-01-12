import { AppDocSection } from '@/components/doc/app.docsection';
import { AppDocSectionNav } from '@/components/doc/app.docsection-nav';
import { AddingPrimeIconsDoc } from '@/doc/uikit/addingprimeicons-doc';
import { CollectionsDoc } from '@/doc/uikit/collections-doc';
import { ComponentsDoc } from '@/doc/uikit/faq/components-doc';
import { LicenceDoc } from '@/doc/uikit/faq/license-doc';
import { RoadmapDoc } from '@/doc/uikit/faq/roadmap-doc';
import { UpdatesDoc } from '@/doc/uikit/faq/updates-doc';
import { UsageDoc } from '@/doc/uikit/faq/usage-doc';
import { GuideOverviewDoc } from '@/doc/uikit/guideoverview-doc';
import { ImportantNoticeDoc } from '@/doc/uikit/importantnotice-doc';
import { EnablingDoc } from '@/doc/uikit/installation/enabling-doc';
import { ImportingDoc } from '@/doc/uikit/installation/importing-doc';
import { PublishingDoc } from '@/doc/uikit/installation/publishing-doc';
import { LimitationsDoc } from '@/doc/uikit/limitations-doc';
import { ResourcesDoc } from '@/doc/uikit/resources-doc';
import { SupportDoc } from '@/doc/uikit/support-doc';
import { UpdatePrimeOneDoc } from '@/doc/uikit/updateprimeone-doc';
import { CIPipelineDoc } from '@/doc/uikit/cipipeline-doc';
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
export class UIKitDemo {
    docs = [
        {
            id: 'overview-demo',
            label: 'Overview',
            component: GuideOverviewDoc
        },
        {
            id: 'important-notice',
            label: 'Important Notice',
            component: ImportantNoticeDoc
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
            id: 'limitations',
            label: 'Limitations',
            component: LimitationsDoc
        },
        {
            id: 'support-demo',
            label: 'Support',
            component: SupportDoc
        }
    ];
}
