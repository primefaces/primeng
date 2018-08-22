import { Routes,RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', component: HomeComponent},
            {path: 'tree', loadChildren: './components/tree/treedemo.module#TreeDemoModule'}
        ])    
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
