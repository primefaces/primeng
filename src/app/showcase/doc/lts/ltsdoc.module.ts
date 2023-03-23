import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { ChangelogDoc } from './changelogdoc';
import { ConfigDoc } from './configdoc';
import { DownloadDoc } from './downloaddoc';
import { FaqDoc } from './faqdoc';
import { IntroDoc } from './introdoc';
import { LicenceDoc } from './licencedoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, AppDocModule, AccordionModule],
    declarations: [ChangelogDoc, ConfigDoc, DownloadDoc, FaqDoc, IntroDoc, LicenceDoc],
    exports: [AppDocModule]
})
export class LtsDocModule {}
