import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DownloadDoc } from './downloaddoc';
import { ExamplesDoc } from './examplesdoc';
import { NextStepsDoc } from './nextstepsdoc';
import { ProviderDoc } from './providerdoc';
import { VerifyDoc } from './verifydoc';
import { VideosDoc } from './videos/videosdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, FormsModule, AppDocModule, ButtonModule],
    declarations: [DownloadDoc, ProviderDoc, VerifyDoc, NextStepsDoc, ExamplesDoc, VideosDoc],
    exports: [AppDocModule]
})
export class InstallationDocModule {}
