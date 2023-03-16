import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { ApiDoc } from './apidoc';
import { ImportDoc } from './importdoc';
import { NgxTranslateDoc } from './ngx-translatedoc';
import { RepositoryDoc } from './repositorydoc';
import { SetLocaleDoc } from './setlocaledoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, RouterModule, AppDocModule],
    declarations: [ImportDoc, ApiDoc, NgxTranslateDoc, RepositoryDoc, SetLocaleDoc],
    exports: [AppDocModule]
})
export class LocaleDocModule {}
