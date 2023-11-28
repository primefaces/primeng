import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlaygroundComponent } from './playground.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: '', component: PlaygroundComponent }])],
    exports: [RouterModule]
})
export class PlaygroundRoutingModule {}
