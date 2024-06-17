import { Component } from '@angular/core';
import { AnimationsDoc } from '@doc/installation/animationsdoc';
import { DownloadDoc } from '@doc/installation/downloaddoc';
import { ExamplesDoc } from '@doc/installation/examplesdoc';
import { StylesDoc } from '@doc/installation/stylesdoc';
import { UsageDoc } from '@doc/installation/usagedoc';
import { VideosDoc } from '@doc/installation/videos/videosdoc';

@Component({
    templateUrl: './installation.html'
})
export class InstallationComponent {
    docs = [
        {
            id: 'download',
            label: 'Download',
            component: DownloadDoc
        },
        {
            id: 'styles',
            label: 'Styles',
            component: StylesDoc
        },
        {
            id: 'usage',
            label: 'Usage',
            component: UsageDoc
        },
        {
            id: 'animations',
            label: 'Animations',
            component: AnimationsDoc
        },
        {
            id: 'examples',
            label: 'QuickStart',
            component: ExamplesDoc
        },
        {
            id: 'videos',
            label: 'Videos',
            component: VideosDoc
        }
    ];
}
