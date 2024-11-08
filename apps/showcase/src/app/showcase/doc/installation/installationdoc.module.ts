import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { ButtonModule } from 'primeng/button';
import { AnimationsDoc } from './animationsdoc';
import { DownloadDoc } from './downloaddoc';
import { ExamplesDoc } from './examplesdoc';
import { NextStepsDoc } from './nextstepsdoc';
import { ThemeDoc } from './themedoc';
import { VerifyDoc } from './verifydoc';
import { VideosDoc } from './videos/videosdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, FormsModule, AppDocModule, ButtonModule],
    declarations: [DownloadDoc, ThemeDoc, VerifyDoc, NextStepsDoc, AnimationsDoc, ExamplesDoc, VideosDoc],
    exports: [AppDocModule]
})
export class InstallationDocModule {}
