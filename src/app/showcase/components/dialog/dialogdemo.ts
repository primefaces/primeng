import {Component} from '@angular/core';

@Component({
    templateUrl: './dialogdemo.html',
    styles: [`
        @media screen and (max-width: 40em) {
            :host ::ng-deep .ui-dialog {
                width: 75vw !important;
            }
        }
    `]
})
export class DialogDemo {

    display: boolean;

    showDialog() {
        this.display = true;
    }
    
}