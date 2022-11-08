import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImageDemo } from './imagedemo';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: ImageDemo }])],
    exports: [RouterModule]
})
export class ImageDemoRoutingModule {}
