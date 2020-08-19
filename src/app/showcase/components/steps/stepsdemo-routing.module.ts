import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router'
import { StepsDemo } from './stepsdemo';
import { ConfirmationDemo } from './confirmationdemo';
import { SeatDemo } from './seatdemo';
import { PaymentDemo } from './paymentdemo';
import { PersonalDemo } from './personaldemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{path:'',component: StepsDemo, children:[
				{path:'', redirectTo: 'personal', pathMatch: 'full'},
				{path: 'personal', component: PersonalDemo},
				{path: 'confirmation', component: ConfirmationDemo},
				{path: 'seat', component: SeatDemo},
				{path: 'payment', component: PaymentDemo}
			]}
		])
	],
	exports: [
		RouterModule
	]
})
export class StepsDemoRoutingModule {}
