import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { CheckboxModule } from 'primeng/checkbox';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { StepsBasicDemo } from './basicdoc';
import { ConfirmationDemo } from './confirmationdemo';
import { EventsDoc } from './eventsdoc';
import { ImportDoc } from './importdoc';
import { StepsInteractiveDemo } from './interactivedoc';
import { MenuItemDoc } from './menuitemdoc';
import { MethodsDoc } from './methodsdoc';
import { PaymentDemo } from './paymentdemo';
import { PersonalDemo } from './personaldemo';
import { PropsDoc } from './propsdoc';
import { StepsRoutingDemo } from './routingdoc';
import { SeatDemo } from './seatdemo';
import { StyleDoc } from './styledoc';
import { TicketService } from '../../service/ticketservice';

@NgModule({
    imports: [CommonModule, AppCodeModule, StepsModule, ToastModule, AppDocModule, FormsModule, DropdownModule, InputTextModule, InputMaskModule, CheckboxModule, CardModule],
    declarations: [StepsBasicDemo, ImportDoc, MenuItemDoc, MethodsDoc, PropsDoc, StyleDoc, StepsInteractiveDemo, EventsDoc, ConfirmationDemo, PaymentDemo, PersonalDemo, SeatDemo, StepsRoutingDemo],
    exports: [AppDocModule],
    providers: [TicketService]
})
export class StepsDocModule {}
