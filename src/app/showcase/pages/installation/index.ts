import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AnimationsDoc } from '@doc/installation/animationsdoc';
import { DownloadDoc } from '@doc/installation/downloaddoc';
import { ExamplesDoc } from '@doc/installation/examplesdoc';
import { StylesDoc } from '@doc/installation/stylesdoc';
import { UsageDoc } from '@doc/installation/usagedoc';
import { VideosDoc } from '@doc/installation/videos/videosdoc';
import { InstallationDocModule } from '@doc/installation/installationdoc.module';

@Component({
    standalone: true,
    imports: [CommonModule, InstallationDocModule],
    template: `<app-doc
        docTitle="Getting Started - PrimeNG"
        header="Installation"
        description="Install PrimeNG in your project."
        [docs]="docs"
    ></app-doc>`,
})
export class InstallationDemo {
    docs = [
        {
            id: 'download',
            label: 'Download',
            component: DownloadDoc,
        },
        {
            id: 'usage',
            label: 'Usage',
            component: UsageDoc,
        },
        {
            id: 'animations',
            label: 'Animations',
            component: AnimationsDoc,
        },
        {
            id: 'examples',
            label: 'QuickStart',
            component: ExamplesDoc,
        },
        {
            id: 'videos',
            label: 'Videos',
            component: VideosDoc,
        },
    ];
}
