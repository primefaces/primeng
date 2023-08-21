import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { FilterModeDoc } from './filtermodedoc';
import { ImportDoc } from './importdoc';
import { ApiDoc } from './locale/apidoc';
import { NgxTranslateDoc } from './locale/ngx-translatedoc';
import { RepositoryDoc } from './locale/repositorydoc';
import { SetLocaleDoc } from './locale/setlocaledoc';
import { RippleDoc } from './rippledoc';
import { ZIndexDoc } from './zindexdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, RouterModule],
    exports: [AppDocModule],
    declarations: [FilterModeDoc, ImportDoc, RippleDoc, ZIndexDoc, NgxTranslateDoc, ApiDoc, RepositoryDoc, SetLocaleDoc]
})
export class ConfigurationDocModule {}
