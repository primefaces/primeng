import {Component,OnInit} from '@angular/core';
import { TicketService } from './ticketservice';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';


@Component({
    template: `
        <div class="stepsdemo-content">
            <p-card>
                <ng-template pTemplate="title">
                    Personal Information
                </ng-template>
                <ng-template pTemplate="subtitle">
                    Enter your personal information
                </ng-template>
                <ng-template pTemplate="content">
                    <div class="p-fluid">
                        <div class="p-field">
                            <label for="firstname">Firstname</label>
                            <input #firstname="ngModel" id="firstname" type="text" required pInputText [(ngModel)]="personalInformation.firstname" [ngClass]="{'p-invalid': (firstname.invalid && submitted) || (firstname.dirty && firstname.invalid)}"> 
                            <small *ngIf="(firstname.invalid && submitted) || (firstname.dirty && firstname.invalid)" class="p-error">Firstname is required.</small>
                        </div>
                        <div class="p-field">
                            <label for="lastname">Lastname</label>
                            <input #lastname="ngModel" id="lastname" type="text" required pInputText [(ngModel)]="personalInformation.lastname" [ngClass]="{'p-invalid': (lastname.invalid && submitted) || (lastname.dirty && lastname.invalid)}"> 
                            <small class="p-error" *ngIf="(lastname.invalid && submitted )|| (lastname.dirty && lastname.invalid)">Lastname is required.</small>
                        </div>
                        <div class="p-field">
                            <label for="age">Age</label>
                            <input #age="ngModel" id="age" type="number" required pInputText [(ngModel)]="personalInformation.age" [ngClass]="{'p-invalid': (age.invalid && submitted) || (age.dirty && age.invalid)}"> 
                            <small class="p-error" *ngIf="(age.invalid && submitted) || (age.dirty && age.invalid)">Age is required.</small>
                        </div>
                    </div>
                </ng-template>
                <ng-template pTemplate="footer">
                    <div class="p-grid p-nogutter p-justify-end">
                        <p-button label="Next" (onClick)="nextPage()" icon="pi pi-angle-right" iconPos="right"></p-button>
                    </div>
                </ng-template>
            </p-card>
        </div>
    `,
})
export class PersonalDemo implements OnInit {

    personalInformation: any;

    submitted: boolean = false;

    constructor(public ticketService: TicketService, private router: Router) { }

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
}
