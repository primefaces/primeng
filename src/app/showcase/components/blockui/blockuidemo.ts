import {Component,OnInit,EventEmitter} from '@angular/core';

@Component({
    templateUrl: './blockuidemo.html'
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