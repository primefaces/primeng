import { AnimationsDoc } from '@/doc/installation/animationsdoc';
import { DownloadDoc } from '@/doc/installation/downloaddoc';
import { ExamplesDoc } from '@/doc/installation/examplesdoc';
import { InstallationDocModule } from '@/doc/installation/installationdoc.module';
import { NextStepsDoc } from '@/doc/installation/nextstepsdoc';
import { ThemeDoc } from '@/doc/installation/themedoc';
import { VerifyDoc } from '@/doc/installation/verifydoc';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [CommonModule, InstallationDocModule],
    template: `<app-doc docTitle="Getting Started - PrimeNG" header="Installation" description="Setting up PrimeNG in an Angular CLI project." [docs]="docs"></app-doc>`
})
export class InstallationDemo {
    docs = [
        {
            id: 'download',
            label: 'Download',
            component: DownloadDoc
        },
        {
            id: 'animations',
            label: 'Animations',
            component: AnimationsDoc
        },
        {
            id: 'theme',
            label: 'Theme',
            component: ThemeDoc
        },
        {
            id: 'verify',
            label: 'Verify',
            component: VerifyDoc
        },
        {
            id: 'examples',
            label: 'Example',
            component: ExamplesDoc
        },
        {
            id: 'nextsteps',
            label: 'Next Steps',
            component: NextStepsDoc
        } /*,
        {
            id: 'videos',
            label: 'Videos',
            component: VideosDoc,
        },*/
    ];
}
