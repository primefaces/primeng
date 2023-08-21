import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuDemo } from './menudemo';
import { MenuDocModule } from '../../doc/menu/menudoc.module';
import { MenuDemoRoutingModule } from './menudemo-routing.module';

@NgModule({
    imports: [CommonModule, MenuDemoRoutingModule, MenuDocModule],
    declarations: [MenuDemo]
})
export class MenuDemoModule {}
