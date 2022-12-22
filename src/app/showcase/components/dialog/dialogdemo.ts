import { Component } from '@angular/core';

@Component({
    templateUrl: './dialogdemo.html',
    styleUrls: ['./dialogdemo.scss']
})
export class DialogDemo {
    displayModal: boolean;

    displayNestedModal: boolean;
    displayNested2Modal: boolean;

    displayBasic: boolean;

    displayBasic2: boolean;

    displayMaximizable: boolean;

    displayResponsive: boolean;

    displayPosition: boolean;

    position: string;

    showModalDialog() {
        this.displayModal = true;
    }

    showNestedModalDialog() {
        this.displayNestedModal = true;
        this.displayNested2Modal = true;
    }

    showBasicDialog() {
        this.displayBasic = true;
    }

    showBasicDialog2() {
        this.displayBasic2 = true;
    }

    showMaximizableDialog() {
        this.displayMaximizable = true;
    }

    showPositionDialog(position: string) {
        this.position = position;
        this.displayPosition = true;
    }

    showResponsiveDialog() {
        this.displayResponsive = true;
    }
}
