import {Component} from '@angular/core';

@Component({
    templateUrl: 'showcase/demo/dialog/dialogdemo.html'
})
export class DialogDemo {

    display: boolean = false;

    showDialog() {
        this.display = true;
    }

    hideDialog() {
        this.display = false;
    }

}