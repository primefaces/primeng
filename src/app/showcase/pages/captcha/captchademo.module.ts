import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CaptchaModule } from 'primeng/captcha';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { AppCodeModule } from 'src/app/showcase/layout/doc/code/app.code.component';
import { AppDemoActionsModule } from '../../layout/demoactions/app.demoactions.component';
import { CaptchaDemo } from './captchademo';
import { CaptchaDemoRoutingModule } from './captchademo-routing.module';

@NgModule({
    imports: [CommonModule, CaptchaDemoRoutingModule, CaptchaModule, TabViewModule, ToastModule, AppDemoActionsModule, AppCodeModule],
    declarations: [CaptchaDemo]
})
export class CaptchaDemoModule {}
