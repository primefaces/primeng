import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsComponent } from './icons.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: IconsComponent }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class IconsRoutingModule { }