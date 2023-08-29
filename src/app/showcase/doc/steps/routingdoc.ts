import { Component, Input, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { TicketService } from '../../service/ticketservice';
import { Code } from '../../domain/code';
import { Subscription } from 'rxjs';

@Component({
    selector: 'routing-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Example below uses nested routes with Steps.</p>
        </app-docsectiontext>
        <div class="card">
            <p-toast></p-toast>
            <p-steps [model]="items" [readonly]="false"></p-steps>
        </div>
        <router-outlet></router-outlet>
        <app-code [code]="code" selector="steps-routing-demo" [routeFiles]="routeFiles"></app-code>
    </section>`,
    providers: [MessageService]
})
export class RoutingDoc implements OnInit {
    @Input() id: string;

    @Input() title: string;

    items: MenuItem[];

    subscription: Subscription;

    constructor(public messageService: MessageService, public ticketService: TicketService) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Personal',
                routerLink: ''
            },
            {
                label: 'Seat',
                routerLink: 'seat'
            },
            {
                label: 'Payment',
                routerLink: 'payment'
            },
            {
                label: 'Confirmation',
                routerLink: 'confirmation'
            }
        ];

        this.subscription = this.ticketService.paymentComplete$.subscribe((personalInformation) => {
            this.messageService.add({ severity: 'success', summary: 'Order submitted', detail: 'Dear, ' + personalInformation.firstname + ' ' + personalInformation.lastname + ' your order completed.' });
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    code: Code = {
        basic: `
<div class="card">
    <p-toast></p-toast>
    <p-steps [model]="items" [readonly]="false"></p-steps>
</div>
<router-outlet></router-outlet>`,

        html: `
<div class="card">
    <p-toast></p-toast>
    <p-steps [model]="items" [readonly]="false"></p-steps>
</div>
<router-outlet></router-outlet>`,

        typescript: `
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { TicketService } from '../../service/ticketservice';
import { Subscription } from 'rxjs';

@Component({
    selector: 'steps-routing-demo',
    templateUrl: './steps-routing-demo.html',
    providers: [MessageService]
})
export class StepsRoutingDemo implements OnInit {
    items: MenuItem[];

    subscription: Subscription;

    constructor(public messageService: MessageService, public ticketService: TicketService) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Personal',
                routerLink: 'personal'
            },
            {
                label: 'Seat',
                routerLink: 'seat'
            },
            {
                label: 'Payment',
                routerLink: 'payment'
            },
            {
                label: 'Confirmation',
                routerLink: 'confirmation'
            }
        ];

        this.subscription = this.ticketService.paymentComplete$.subscribe((personalInformation) => {
            this.messageService.add({ severity: 'success', summary: 'Order submitted', detail: 'Dear, ' + personalInformation.firstname + ' ' + personalInformation.lastname + ' your order completed.' });
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}`,
        routerModule: `
    RouterModule.forRoot([
        {
            path: '',
            children: [
                { path: 'personal', component: PersonalDemo },
                { path: 'seat', component: SeatDemo },
                { path: 'payment', component: PaymentDemo }
                { path: 'confirmation', component: ConfirmationDemo },
                { path: '', redirectTo: 'personal', pathMatch: 'full' },
            ]
        }
    ])`,
        service: ['TicketService']
    };

    routeFiles = [
        {
            path: 'src/app/demo/paymentdemo.ts',
            name: 'PaymentDemo',
            content: `import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../service/ticketservice';
import { Router } from '@angular/router';

@Component({
    template: \`
        <div class="stepsdemo-content">
            <p-card>
                <ng-template pTemplate="title"> Payment Information </ng-template>
                <ng-template pTemplate="subtitle"> Enter your card details </ng-template>
                <ng-template pTemplate="content">
                    <div class="p-fluid formgrid grid">
                        <div class="field col-12">
                            <label for="class">Card Holder Name</label>
                            <input type="text" required pInputText [(ngModel)]="paymentInformation.cardholderName" />
                        </div>
                        <div class="field col-8">
                            <label id="number" for="lastname">Number</label>
                            <p-inputMask inputId="number" mask="9999-9999-9999-9999" [(ngModel)]="paymentInformation.cardholderNumber"></p-inputMask>
                        </div>
                        <div class="field col-2">
                            <label id="date" for="date">Date</label>
                            <p-inputMask inputId="date" mask="99/99" [(ngModel)]="paymentInformation.date"></p-inputMask>
                        </div>
                        <div class="field col-2">
                            <label for="cvv">CVV</label>
                            <p-inputMask id="cvv" mask="999" [(ngModel)]="paymentInformation.cvv"></p-inputMask>
                        </div>
                        <div class="field-checkbox col-12">
                            <p-checkbox id="remember" [binary]="true" [(ngModel)]="paymentInformation.remember"></p-checkbox>
                            <label for="remember" class="p-checkbox-label">Save credit card information for future</label>
                        </div>
                    </div>
                </ng-template>
                <ng-template pTemplate="footer">
                    <div class="grid grid-nogutter justify-content-between">
                        <p-button label="Back" (onClick)="prevPage()" icon="pi pi-angle-left"></p-button>
                        <p-button label="Next" (onClick)="nextPage()" icon="pi pi-angle-right" iconPos="right"></p-button>
                    </div>
                </ng-template>
            </p-card>
        </div>
    \`
})
export class PaymentDemo implements OnInit {
    paymentInformation: any;

    constructor(public ticketService: TicketService, private router: Router) {}

    ngOnInit() {
        this.paymentInformation = this.ticketService.ticketInformation.paymentInformation;
    }

    nextPage() {
        this.ticketService.ticketInformation.paymentInformation = this.paymentInformation;
        this.router.navigate(['steps/confirmation']);
    }

    prevPage() {
        this.router.navigate(['steps/seat']);
    }
}`
        },
        {
            path: 'src/app/demo/personaldemo.ts',
            name: 'PersonalDemo',
            content: `import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../service/ticketservice';
import { Router } from '@angular/router';

@Component({
    template: \`
        <div class="stepsdemo-content">
            <p-card>
                <ng-template pTemplate="title"> Personal Information </ng-template>
                <ng-template pTemplate="subtitle"> Enter your personal information </ng-template>
                <ng-template pTemplate="content">
                    <div class="p-fluid">
                        <div class="field">
                            <label for="firstname">Firstname</label>
                            <input
                                #firstname="ngModel"
                                id="firstname"
                                type="text"
                                required
                                pInputText
                                [(ngModel)]="personalInformation.firstname"
                                [ngClass]="{ 'ng-dirty': (firstname.invalid && submitted) || (firstname.dirty && firstname.invalid) }"
                            />
                            <small *ngIf="(firstname.invalid && submitted) || (firstname.dirty && firstname.invalid)" class="p-error">Firstname is required.</small>
                        </div>
                        <div class="field">
                            <label for="lastname">Lastname</label>
                            <input #lastname="ngModel" id="lastname" type="text" required pInputText [(ngModel)]="personalInformation.lastname" [ngClass]="{ 'ng-dirty': (lastname.invalid && submitted) || (lastname.dirty && lastname.invalid) }" />
                            <small class="p-error" *ngIf="(lastname.invalid && submitted) || (lastname.dirty && lastname.invalid)">Lastname is required.</small>
                        </div>
                        <div class="field">
                            <label for="age">Age</label>
                            <input #age="ngModel" id="age" type="number" required pInputText [(ngModel)]="personalInformation.age" [ngClass]="{ 'ng-dirty': (age.invalid && submitted) || (age.dirty && age.invalid) }" />
                            <small class="p-error" *ngIf="(age.invalid && submitted) || (age.dirty && age.invalid)">Age is required.</small>
                        </div>
                    </div>
                </ng-template>
                <ng-template pTemplate="footer">
                    <div class="grid grid-nogutter justify-content-end">
                        <p-button label="Next" (onClick)="nextPage()" icon="pi pi-angle-right" iconPos="right"></p-button>
                    </div>
                </ng-template>
            </p-card>
        </div>
    \`
})
export class PersonalDemo implements OnInit {
    personalInformation: any;

    submitted: boolean = false;

    constructor(public ticketService: TicketService, private router: Router) {}

    ngOnInit() {
        this.personalInformation = this.ticketService.getTicketInformation().personalInformation;
    }

    nextPage() {
        if (this.personalInformation.firstname && this.personalInformation.lastname && this.personalInformation.age) {
            this.ticketService.ticketInformation.personalInformation = this.personalInformation;
            this.router.navigate(['steps/seat']);

            return;
        }

        this.submitted = true;
    }
}`
        },
        {
            path: 'src/app/demo/seatdemo.ts',
            name: 'SeatDemo',
            content: `import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../service/ticketservice';
import { Router } from '@angular/router';

@Component({
    template: \`
        <div class="stepsdemo-content">
            <p-card>
                <ng-template pTemplate="title"> Seat Information </ng-template>
                <ng-template pTemplate="subtitle"> Choose your seat </ng-template>
                <ng-template pTemplate="content">
                    <div class="p-fluid formgrid grid">
                        <div class="field col-12 md:col-6">
                            <label for="class">Class</label>
                            <p-dropdown inputId="class" [(ngModel)]="seatInformation.class" [options]="classes" (onChange)="setVagons($event)" optionLabel="name" placeholder="Select a Class"></p-dropdown>
                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="wagon">Wagon</label>
                            <p-dropdown inputId="wagon" [(ngModel)]="seatInformation.wagon" [options]="vagons" (onChange)="setSeats($event)" optionLabel="wagon" placeholder="Select a Wagon"></p-dropdown>
                        </div>
                        <div class="field col-12">
                            <label for="seat">Seat</label>
                            <p-dropdown inputId="seat" [(ngModel)]="seatInformation.seat" [options]="seats" optionLabel="seat" placeholder="Select a Seat"></p-dropdown>
                        </div>
                    </div>
                </ng-template>
                <ng-template pTemplate="footer">
                    <div class="grid grid-nogutter justify-content-between">
                        <p-button label="Back" (onClick)="prevPage()" icon="pi pi-angle-left"></p-button>
                        <p-button label="Next" (onClick)="nextPage()" icon="pi pi-angle-right" iconPos="right"></p-button>
                    </div>
                </ng-template>
            </p-card>
        </div>
        \`
})
export class SeatDemo implements OnInit {
    constructor(public ticketService: TicketService, private router: Router) {}

    classes: any[];

    vagons: any[];

    seats: any[];

    seatInformation: any;

    ngOnInit() {
        this.seatInformation = this.ticketService.ticketInformation.seatInformation;

        this.classes = [
            { name: 'First Class', code: 'A', factor: 1 },
            { name: 'Second Class', code: 'B', factor: 2 },
            { name: 'Third Class', code: 'C', factor: 3 }
        ];
    }

    setVagons(event) {
        if (this.seatInformation.class && event.value) {
            this.vagons = [];
            this.seats = [];
            for (let i = 1; i < 3 * event.value.factor; i++) {
                this.vagons.push({ wagon: i + event.value.code, type: event.value.name, factor: event.value.factor });
            }
        }
    }

    setSeats(event) {
        if (this.seatInformation.wagon && event.value) {
            this.seats = [];
            for (let i = 1; i < 10 * event.value.factor; i++) {
                this.seats.push({ seat: i, type: event.value.type });
            }
        }
    }

    nextPage() {
        this.ticketService.ticketInformation.seatInformation = this.seatInformation;
        this.router.navigate(['steps/payment']);
    }

    prevPage() {
        this.router.navigate(['steps/personal']);
    }
}`
        },
        {
            path: 'src/app/demo/confirmationdemo.ts',
            name: 'ConfirmationDemo',
            content: `import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../service/ticketservice';
import { Router } from '@angular/router';

@Component({
    template: \`
        <div class="stepsdemo-content">
            <p-card>
                <ng-template pTemplate="title"> Confirmation </ng-template>
                <ng-template pTemplate="subtitle"> Enter your card details </ng-template>
                <ng-template pTemplate="content">
                    <div class="field col-12">
                        <label for="class">Name</label>
                        <b>{{ ticketInformation.personalInformation.firstname ? ticketInformation.personalInformation.firstname : '-' }} {{ ticketInformation.personalInformation.lastname ? ticketInformation.personalInformation.lastname : '-' }}</b>
                    </div>
                    <div class="field col-12">
                        <label for="Age">Age</label>
                        <b>{{ ticketInformation.personalInformation.age ? ticketInformation.personalInformation.age : '-' }}</b>
                    </div>
                    <div class="field col-12">
                        <label for="Age">Seat Class</label>
                        <b>{{ ticketInformation.seatInformation.class ? ticketInformation.seatInformation.class.name : '-' }}</b>
                    </div>
                    <div class="field col-12">
                        <label for="Age">Wagon Number</label>
                        <b>{{ ticketInformation.seatInformation.wagon ? ticketInformation.seatInformation.wagon.wagon : '-' }}</b>
                    </div>
                    <div class="field col-12">
                        <label for="Age">Seat</label>
                        <b>{{ ticketInformation.seatInformation.seat ? ticketInformation.seatInformation.seat.seat : '-' }}</b>
                    </div>
                    <div class="field col-12">
                        <label for="Age">Cardholder Name</label>
                        <b>{{ ticketInformation.paymentInformation.cardholderName ? ticketInformation.paymentInformation.cardholderName : '-' }}</b>
                    </div>
                    <div class="field col-12">
                        <label for="Age">Card Number</label>
                        <b>{{ ticketInformation.paymentInformation.cardholderNumber ? ticketInformation.paymentInformation.cardholderNumber : '-' }}</b>
                    </div>
                    <div class="field col-12">
                        <label for="Age">Date</label>
                        <b>{{ ticketInformation.paymentInformation.date ? ticketInformation.paymentInformation.date : '-' }}</b>
                    </div>
                    <div class="field col-12">
                        <label for="Age">CVV</label>
                        <b>{{ ticketInformation.paymentInformation.cvv && ticketInformation.paymentInformation.cvv.length === 3 ? '**' + ticketInformation.paymentInformation.cvv[2] : '-' }}</b>
                    </div>
                </ng-template>
                <ng-template pTemplate="footer">
                    <div class="grid grid-nogutter justify-content-between">
                        <p-button label="Back" (onClick)="prevPage()" icon="pi pi-angle-left"></p-button>
                        <p-button label="Complete" (onClick)="complete()" icon="pi pi-angle-right" iconPos="right" styleClass="p-button-success"></p-button>
                    </div>
                </ng-template>
            </p-card>
        </div>
    \`
})
export class ConfirmationDemo implements OnInit {
    ticketInformation: any;

    constructor(public ticketService: TicketService, private router: Router) {}

    ngOnInit() {
        this.ticketInformation = this.ticketService.ticketInformation;
    }

    complete() {
        this.ticketService.complete();
    }

    prevPage() {
        this.router.navigate(['steps/payment']);
    }
}`
        }
    ];
}
