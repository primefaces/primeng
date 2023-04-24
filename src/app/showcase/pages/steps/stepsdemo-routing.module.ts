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
                    { path: '', redirectTo: 'personal', pathMatch: 'full' },
                    { path: 'personal', component: PersonalDemo },
                    { path: 'confirmation', component: ConfirmationDemo },
                    { path: 'seat', component: SeatDemo },
                    { path: 'payment', component: PaymentDemo }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class StepsDemoRoutingModule {}
