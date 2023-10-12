import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../service/ticketservice';
import { Router } from '@angular/router';

@Component({
    template: `
        <div class="stepsdemo-content" id="seat-content">
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
    `
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
        this.router.navigate(['steps/payment'], { fragment: 'routing' });
    }

    prevPage() {
        this.router.navigate(['steps/personal'], { fragment: 'routing' });
    }
}
