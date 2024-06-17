import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenubarDocModule } from '@doc/menubar/menubardoc.module';
import { MenubarDemo } from './menubardemo';
import { MenubarDemoRoutingModule } from './menubardemo-routing.module';

@NgModule({
    imports: [CommonModule, MenubarDemoRoutingModule, MenubarDocModule],
    declarations: [MenubarDemo]
})
export class MenubarDemoModule {}
