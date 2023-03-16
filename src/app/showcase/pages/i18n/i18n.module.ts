import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCodeModule } from 'src/app/showcase/layout/doc/code/app.code.component';
import { I18NRoutingModule } from './i18n-routing.module';
import { I18NComponent } from './i18n.component';

@NgModule({
    imports: [CommonModule, AppCodeModule, I18NRoutingModule],
    declarations: [I18NComponent]
})
export class I18NModule {}
