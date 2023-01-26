import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { UIKitService } from '../../service/uikitservice';
import { UIKitRoutingModule } from './uikit-routing.module';
import { UIKitComponent } from './uikit.component';

@NgModule({
    imports: [CommonModule, UIKitRoutingModule, HttpClientModule],
    providers: [UIKitService],
    declarations: [UIKitComponent]
})
export class UIKitModule {}
