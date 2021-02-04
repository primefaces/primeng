import {Component,OnInit} from '@angular/core';
import { TicketService } from './ticketservice';
import { Router } from '@angular/router';


@Component({
    template: `
        <div class="stepsdemo-content">
            <p-card>
                <ng-template pTemplate="title">
                    Confirmation
                </ng-template>
                <ng-template pTemplate="subtitle">
                    Enter your card details
                </ng-template>
                <ng-template pTemplate="content">
                    <div class="p-field p-col-12">
                        <label for="class">Name</label>
                        <b>{{ticketInformation.personalInformation.firstname ? ticketInformation.personalInformation.firstname : '-'}} {{ticketInformation.personalInformation.lastname ? ticketInformation.personalInformation.lastname : '-'}}</b>
                    </div>
                    <div class="p-field p-col-12">
                        <label for="Age">Age</label>
                        <b>{{ticketInformation.personalInformation.age ? ticketInformation.personalInformation.age : '-'}}</b>
                    </div>
                    <div class="p-field p-col-12">
                        <label for="Age">Seat Class</label>
                        <b>{{ticketInformation.seatInformation.class ? ticketInformation.seatInformation.class.name : '-'}}</b>
                    </div>
                    <div class="p-field p-col-12">
                        <label for="Age">Wagon Number</label>
                        <b>{{ticketInformation.seatInformation.wagon ? ticketInformation.seatInformation.wagon.wagon : '-'}}</b>
                    </div>
                    <div class="p-field p-col-12">
                        <label for="Age">Seat</label>
                        <b>{{ticketInformation.seatInformation.seat ? ticketInformation.seatInformation.seat.seat : '-'}}</b>
                    </div>
                    <div class="p-field p-col-12">
                        <label for="Age">Cardholder Name</label>
                        <b>{{ticketInformation.paymentInformation.cardholderName ? ticketInformation.paymentInformation.cardholderName : '-'}}</b>
                    </div>
                    <div class="p-field p-col-12">
                        <label for="Age">Card Number</label>
                        <b>{{ticketInformation.paymentInformation.cardholderNumber ? ticketInformation.paymentInformation.cardholderNumber : '-'}}</b>
                    </div>
                    <div class="p-field p-col-12">
                        <label for="Age">Date</label>
                        <b>{{ticketInformation.paymentInformation.date ? ticketInformation.paymentInformation.date : '-'}}</b>
                    </div>
                    <div class="p-field p-col-12">
                        <label for="Age">CVV</label>
                        <b>{{ticketInformation.paymentInformation.cvv && ticketInformation.paymentInformation.cvv.length === 3  ? '**' + ticketInformation.paymentInformation.cvv[2] : '-'}}</b>
                    </div>
                </ng-template>
                <ng-template pTemplate="footer">
                    <div class="p-grid p-nogutter p-justify-between">
                        <p-button label="Back" (onClick)="prevPage()" icon="pi pi-angle-left"></p-button>
                        <p-button label="Complete" (onClick)="complete()" icon="pi pi-angle-right" iconPos="right" styleClass="p-button-success"></p-button>
                    </div>
                </ng-template>
            </p-card>
        </div>
    `,
})
export class ConfirmationDemo implements OnInit {
    
    ticketInformation: any;
    
    constructor(public ticketService: TicketService, private router: Router) { }

    ngOnInit() { 
        this.ticketInformation = this.ticketService.ticketInformation;
    }

    complete() {
        this.ticketService.complete();
    }

    prevPage() {
        this.router.navigate(['steps/payment']);
    }
}
