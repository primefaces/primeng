import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { AppCodeModule } from 'src/app/showcase/layout/doc/code/app.code.component';
import { IconsRoutingModule } from './icons-routing.module';
import { IconsComponent } from './icons.component';

@NgModule({
    imports: [CommonModule, InputTextModule, AppCodeModule, IconsRoutingModule],
    declarations: [IconsComponent]
})
export class IconsModule {}
