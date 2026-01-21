import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'figma-doc',
    standalone: true,
    imports: [CommonModule, AppDocSectionText, RouterModule],
    template: `<app-docsectiontext>
        <p>
            Tokens Studio in Figma is the starting point of a continuous integration pipeline. You can connect a remote repository to sync your tokens data so that changes are saved remotely instead of locally. Tokens Studio offers various remote
            storage options such as <a href="https://docs.tokens.studio/token-storage/remote/sync-git-github" target="_blank" rel="noopener noreferrer">GitHub</a>,
            <a href="https://docs.tokens.studio/token-storage/remote/sync-git-gitlab" target="_blank" rel="noopener noreferrer">GitLab</a> and
            <a href="https://docs.tokens.studio/token-storage/remote/sync-git-bitbucket" target="_blank" rel="noopener noreferrer">Bitbucket</a>. Refer to these documentations based on your environment before proceeding to the integrations in the
            next section.
        </p>
    </app-docsectiontext>`
})
export class FigmaDoc {}
