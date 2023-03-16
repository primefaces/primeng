import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { DownloadDoc } from './downloaddoc';
import { StylesDoc } from './stylesdoc';
import { UsageDoc } from './usagedoc';
import { AngularCliDoc } from './angular-clidoc';
import { VideosDoc } from './videos/videosdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, FormsModule, AppDocModule, ButtonModule],
    declarations: [DownloadDoc, StylesDoc, UsageDoc, VideosDoc, AngularCliDoc],
    exports: [AppDocModule]
})
export class InstallationDocModule {}
