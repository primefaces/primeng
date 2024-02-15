import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { AnimationsDoc } from './animationsdoc';
import { DownloadDoc } from './downloaddoc';
import { ExamplesDoc } from './examplesdoc';
import { StylesDoc } from './stylesdoc';
import { UsageDoc } from './usagedoc';
import { VideosDoc } from './videos/videosdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, FormsModule, AppDocModule, ButtonModule],
    declarations: [DownloadDoc, StylesDoc, UsageDoc, AnimationsDoc, ExamplesDoc, VideosDoc],
    exports: [AppDocModule]
})
export class InstallationDocModule {}
