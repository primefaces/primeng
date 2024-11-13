import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CspDoc } from './cspdoc';
import { FilterModeDoc } from './filtermodedoc';
import { ImportDoc } from './importdoc';
import { ApiDoc } from './locale/apidoc';
import { NgxTranslateDoc } from './locale/ngx-translatedoc';
import { RepositoryDoc } from './locale/repositorydoc';
import { SetLocaleDoc } from './locale/setlocaledoc';
import { RippleDoc } from './rippledoc';
import { ThemingDoc } from './themingdoc';
import { ZIndexDoc } from './zindexdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, RouterModule],
    exports: [AppDocModule],
    declarations: [FilterModeDoc, ImportDoc, CspDoc, RippleDoc, ZIndexDoc, NgxTranslateDoc, ApiDoc, RepositoryDoc, SetLocaleDoc, ThemingDoc]
})
export class ConfigurationDocModule {}
