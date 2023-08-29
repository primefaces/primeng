import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmationDemo } from '../../doc/steps/confirmationdemo';
import { PaymentDemo } from '../../doc/steps/paymentdemo';
import { PersonalDemo } from '../../doc/steps/personaldemo';
import { SeatDemo } from '../../doc/steps/seatdemo';
import { StepsDemo } from './stepsdemo';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: StepsDemo,
                children: [
                    { path: 'personal', component: PersonalDemo },
                    { path: 'seat', component: SeatDemo },
                    { path: 'payment', component: PaymentDemo },
                    { path: 'confirmation', component: ConfirmationDemo },
                    { path: '', redirectTo: 'personal', pathMatch: 'full' }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class StepsDemoRoutingModule {}
