import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AvatarDocModule } from '../../doc/avatar/avatardoc.module';
import { AppDemoActionsModule } from '../../layout/demoactions/app.demoactions.component';
import { AvatarDemo } from './avatardemo';
import { AvatarDemoRoutingModule } from './avatardemo-routing.module';

@NgModule({
    imports: [CommonModule, AvatarDemoRoutingModule, AppDemoActionsModule, AvatarDocModule],
    declarations: [AvatarDemo]
})
export class AvatarDemoModule {}
