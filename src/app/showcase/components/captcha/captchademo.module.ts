import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';
import {CaptchaDemo} from './captchademo';
import {CaptchaDemoRoutingModule} from './captchademo-routing.module';
import {CaptchaModule} from '../../../components/captcha/captcha';
import {ToastModule} from '../../../components/toast/toast';
import {TabViewModule} from '../../../components/tabview/tabview';
import {CodeHighlighterModule} from '../../../components/codehighlighter/codehighlighter';

@NgModule({
	imports: [
		CommonModule,
		CaptchaDemoRoutingModule,
        CaptchaModule,
        TabViewModule,
        ToastModule,
        CodeHighlighterModule
	],
	declarations: [
		CaptchaDemo
	]
})
export class CaptchaDemoModule {}
