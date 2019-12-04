import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import {CaptchaDemo} from './captchademo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: CaptchaDemo}
		])
	],
	exports: [
		RouterModule
	]
})
export class CaptchaDemoRoutingModule {}
