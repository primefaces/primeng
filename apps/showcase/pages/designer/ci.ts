import { AppDocSection } from '@/components/doc/app.docsection';
import { AppDocSectionNav } from '@/components/doc/app.docsection-nav';
import { DesignerApiDoc } from '@/doc/designer/ci/designerapidoc';
import { FigmaDoc } from '@/doc/designer/ci/figmadoc';
import { BitbucketDoc } from '@/doc/designer/ci/integration/bitbucketdoc';
import { GitHubDoc } from '@/doc/designer/ci/integration/githubdoc';
import { GitLabDoc } from '@/doc/designer/ci/integration/gitlabdoc';
import { LivePreviewDoc } from '@/doc/designer/ci/livepreviewdoc';
import { OverviewDoc } from '@/doc/designer/ci/overviewdoc';
import { VideoTutorialDoc } from '@/doc/designer/ci/videotutorialdoc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [AppDocSection, AppDocSectionNav],
    template: `<div class="doc">
        <div class="doc-main">
            <div class="doc-intro">
                <h1>Figma to Theme Code CI Pipeline</h1>
                <p>Automate the conversion of Figma design tokens to theme code using CI pipelines and the theme designer API.</p>
            </div>
            <app-docsection [docs]="docs" />
        </div>
        <app-docsection-nav [docs]="docs" />
    </div>`
})
export class CIDemo {
    docs = [
        {
            id: 'overview',
            label: 'Overview',
            component: OverviewDoc
        },
        {
            id: 'videotutorial',
            label: 'Video Tutorial',
            component: VideoTutorialDoc
        },
        {
            id: 'designer-api',
            label: '1) Designer API',
            component: DesignerApiDoc
        },
        {
            id: 'figma',
            label: '2) Figma',
            component: FigmaDoc
        },
        {
            id: 'integration',
            label: '3) Integration',
            description: `Once the Token Studio Sync Provider is running and you have obtained a Secret Key for the Designer API, you can connect your repository to the Theme Designer API to automatically generate themes whenever the tokens file changes via your CI pipeline. For GitHub, PrimeTek provides an official GitHub Action available on the GitHub Marketplace, while for GitLab and Bitbucket, sample implementations are provided as references for building your own integration.`,
            children: [
                {
                    id: 'github',
                    label: 'GitHub',
                    component: GitHubDoc
                },
                {
                    id: 'gitlab',
                    label: 'GitLab',
                    component: GitLabDoc
                },
                {
                    id: 'bitbucket',
                    label: 'Bitbucket',
                    component: BitbucketDoc
                }
            ]
        },
        {
            id: 'livepreview',
            label: '4) Live Preview',
            component: LivePreviewDoc
        }
    ];
}
