import {Component,OnInit,EventEmitter} from '@angular/core';

@Component({
    templateUrl: './blockuidemo.html',
    styles: [`
        :host ::ng-deep button {
            margin-right: .25em;
        }
    `]
})
export class BlockUIDemo {

    blockedPanel: boolean = false;
    
    blockedDocument: boolean = false;
        
    blockDocument() {
        this.blockedDocument = true;
        setTimeout(() => {
            this.blockedDocument = false;
        }, 3000);
    }
}