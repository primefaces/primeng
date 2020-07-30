import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CaptchaDemo} from './captchademo';
import {CaptchaDemoRoutingModule} from './captchademo-routing.module';
import {CaptchaModule} from 'primeng/captcha';
import {ToastModule} from 'primeng/toast';
import {TabViewModule} from 'primeng/tabview';
import {AppCodeModule} from '../../app.code.component';

@NgModule({
	imports: [
		CommonModule,
		CaptchaDemoRoutingModule,
        CaptchaModule,
        TabViewModule,
        ToastModule,
        AppCodeModule
	],
	declarations: [
		CaptchaDemo
	]
})
export class CaptchaDemoModule {}
