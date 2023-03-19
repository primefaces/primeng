import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarDocModule } from '../../doc/avatar/avatardoc.module';
import { AvatarDemo } from './avatardemo';
import { AvatarDemoRoutingModule } from './avatardemo-routing.module';

@NgModule({
    imports: [CommonModule, AvatarDemoRoutingModule, AvatarDocModule],
    declarations: [AvatarDemo]
})
export class AvatarDemoModule {}
