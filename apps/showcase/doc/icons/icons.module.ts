import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { BasicDoc } from './basicdoc';
import { ColorDoc } from './colordoc';
import { ConstantsDoc } from './constantsdoc';
import { DownloadDoc } from './downloaddoc';
import { FigmaDoc } from './figmadoc';
import { ImportDoc } from './importdoc';
import { ListDoc } from './listdoc';
import { SizeDoc } from './sizedoc';
import { SpinDoc } from './spindoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, MenuModule],
    declarations: [BasicDoc, ColorDoc, ConstantsDoc, DownloadDoc, ImportDoc, ListDoc, SizeDoc, SpinDoc, FigmaDoc],
    exports: [AppDocModule]
})
export class IconsDocModule {}
