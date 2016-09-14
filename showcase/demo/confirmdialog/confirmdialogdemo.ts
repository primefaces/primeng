import {Component} from '@angular/core';

@Component({
    templateUrl: 'showcase/demo/confirmdialog/confirmdialogdemo.html'
})
export class ConfirmDialogDemo {

    display: boolean = false;

    showDialog() {
        this.display = true;
    }

    hideDialog() {
        this.display = false;
    }

}