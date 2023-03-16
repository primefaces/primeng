import { Component } from '@angular/core';
import { DownloadDoc } from '../../doc/installation/downloaddoc';
import { StylesDoc } from '../../doc/installation/stylesdoc';
import { UsageDoc } from '../../doc/installation/usagedoc';
import { AngularCliDoc } from '../../doc/installation/angular-clidoc';
import { VideosDoc } from '../../doc/installation/videos/videosdoc';

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
            id: 'angular-cli',
            label: 'Angular CLI Integration',
            component: AngularCliDoc
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
            id: 'videos',
            label: 'Videos',
            component: VideosDoc
        }
    ];
}
