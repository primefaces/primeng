import { AppDocModule } from '@/components/doc/app.doc.module';
import { BaseDoc } from '@/doc/designer/createtheme/basedoc';
import { FigmaDoc } from '@/doc/designer/createtheme/figmadoc';
import { DashboardDoc } from '@/doc/designer/dashboarddoc';
import { CustomTokensDoc } from '@/doc/designer/editor/customtokensdoc';
import { IntelligentCompletionDoc } from '@/doc/designer/editor/intelligentcompletiondoc';
import { TokenSetsDoc } from '@/doc/designer/editor/tokensetsdoc';
import { TypographyDoc } from '@/doc/designer/editor/typographydoc';
import { LicenseDoc } from '@/doc/designer/licensedoc';
import { LimitationsDoc } from '@/doc/designer/limitationsdoc';
import { MigrationAssistantDoc } from '@/doc/designer/migrationassistantdoc';
import { OverviewDoc } from '@/doc/designer/overviewdoc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [AppDocModule],
    template: `<div class="doc">
        <div class="doc-main">
            <div class="doc-intro">
                <h1>Designer</h1>
                <p>Theme Designer is the ultimate tool to customize and design your own themes featuring a visual editor, figma to code, cloud storage, and migration assistant.</p>
            </div>
            <app-docsection [docs]="docs" />
        </div>
        <app-docsection-nav [docs]="docs" />
    </div>`
})
export class GuideDemo {
    docs = [
        {
            id: 'overview',
            label: 'Overview',
            component: OverviewDoc
        },
        {
            id: 'license',
            label: 'License',
            component: LicenseDoc
        },
        {
            id: 'dashboard',
            label: 'Dashboard',
            component: DashboardDoc
        },
        {
            id: 'create',
            label: 'Create Theme',
            description: 'A theme can be initiated from one of the built-in themes or from Figma UI Kit.',
            children: [
                {
                    id: 'base',
                    label: 'Base',
                    component: BaseDoc
                },
                {
                    id: 'tokensets',
                    label: 'Figma',
                    component: FigmaDoc
                }
            ]
        },
        {
            id: 'editor',
            label: 'Editor',
            children: [
                {
                    id: 'tokensets',
                    label: 'Token Sets',
                    component: TokenSetsDoc
                },
                {
                    id: 'customtokens',
                    label: 'Custom Tokens',
                    component: CustomTokensDoc
                },
                {
                    id: 'autocomplete',
                    label: 'Intelligent Completion',
                    component: IntelligentCompletionDoc
                },
                {
                    id: 'typography',
                    label: 'Typography',
                    component: TypographyDoc
                }
            ]
        },
        {
            id: 'migration',
            label: 'Migration Assistant',
            component: MigrationAssistantDoc
        },
        {
            id: 'limitations',
            label: 'Limitations',
            component: LimitationsDoc
        }
    ];
}
