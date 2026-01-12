import { DownloadDoc } from '@/doc/installation/download-doc';
import { ExamplesDoc } from '@/doc/installation/examples-doc';
import { NextStepsDoc } from '@/doc/installation/nextsteps-doc';
import { ProviderDoc } from '@/doc/installation/provider-doc';
import { VerifyDoc } from '@/doc/installation/verify-doc';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [CommonModule, AppDoc],
    template: `<app-doc docTitle="Getting Started - PrimeNG" header="Installation" description="Setting up PrimeNG in an Angular CLI project." [docs]="docs" docType="page"></app-doc>`
})
export class InstallationDemo {
    docs = [
        {
            id: 'download',
            label: 'Download',
            component: DownloadDoc
        },
        {
            id: 'provider',
            label: 'Provider',
            component: ProviderDoc
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
