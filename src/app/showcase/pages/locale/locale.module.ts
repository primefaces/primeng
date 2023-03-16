import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LocaleDocModule } from '../../doc/locale/localedoc.module';
import { LocaleRoutingModule } from './locale-routing.module';
import { LocaleComponent } from './locale.component';

@NgModule({
    imports: [CommonModule, LocaleRoutingModule, LocaleDocModule],
    declarations: [LocaleComponent]
})
export class LocaleModule {}
