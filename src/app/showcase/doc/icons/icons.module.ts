import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { BasicDoc } from './basicdoc';
import { ColorDoc } from './colordoc';
import { ConstantsDoc } from './constantsdoc';
import { DownloadDoc } from './downloaddoc';
import { ImportDoc } from './importdoc';
import { ListDoc } from './listdoc';
import { SizeDoc } from './sizedoc';
import { SpinDoc } from './spindoc';
import { MenuModule } from 'primeng/menu';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, MenuModule],
    declarations: [BasicDoc, ColorDoc, ConstantsDoc, DownloadDoc, ImportDoc, ListDoc, SizeDoc, SpinDoc],
    exports: [AppDocModule]
})
export class IconsDocModule {}
