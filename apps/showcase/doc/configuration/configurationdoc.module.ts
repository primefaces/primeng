import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CspDoc } from './cspdoc';
import { DynamicDoc } from './dynamicdoc';
import { FilterModeDoc } from './filtermodedoc';
import { InputVariantDoc } from './inputvariantdoc';
import { ApiDoc } from './locale/apidoc';
import { RepositoryDoc } from './locale/repositorydoc';
import { RuntimeDoc } from './locale/runtimedoc';
import { TranslationDoc } from './locale/translationdoc';
import { ProviderDoc } from './providerdoc';
import { RippleDoc } from './rippledoc';
import { ThemeDoc } from './themedoc';
import { ZIndexDoc } from './zindexdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, RouterModule],
    exports: [AppDocModule],
    declarations: [FilterModeDoc, ProviderDoc, DynamicDoc, InputVariantDoc, CspDoc, RippleDoc, ZIndexDoc, RuntimeDoc, ApiDoc, RepositoryDoc, TranslationDoc, ThemeDoc]
})
export class ConfigurationDocModule {}
