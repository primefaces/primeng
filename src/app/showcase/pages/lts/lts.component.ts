import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ChangelogDoc } from '../../doc/lts/changelogdoc';
import { ConfigDoc } from '../../doc/lts/configdoc';
import { DownloadDoc } from '../../doc/lts/downloaddoc';
import { FaqDoc } from '../../doc/lts/faqdoc';
import { IntroDoc } from '../../doc/lts/introdoc';
import { LicenceDoc } from '../../doc/lts/licencedoc';
@Component({
    templateUrl: './lts.component.html'
})
export class LTSComponent {
    constructor(private titleService: Title, private metaService: Meta) {
        this.titleService.setTitle('Long Term Support - PrimeNG');
        this.metaService.updateTag({ name: 'description', content: 'Long Term Support' });
    }

    docs = [
        {
            id: 'what-is-lts',
            label: 'What is LTS?',
            component: IntroDoc
        },
        {
            id: 'licence-terms',
            label: 'License Terms',
            component: LicenceDoc
        },
        {
            id: 'changelog',
            label: 'Changelog',
            component: ChangelogDoc
        },
        {
            id: 'download',
            label: 'Download',
            component: DownloadDoc
        },
        {
            id: 'configuration',
            label: 'Configuration',
            component: ConfigDoc
        },
        {
            id: 'faq',
            label: 'FAQ',
            component: FaqDoc
        }
    ];
}
