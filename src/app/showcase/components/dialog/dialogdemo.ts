import { Component } from '@angular/core';

@Component({
    templateUrl: './dialogdemo.html',
    styleUrls: ['./dialogdemo.scss']
})
export class DialogDemo {

    headerButtonPressedCount: number;

    displayModal: boolean;

    displayBasic: boolean;

    displayBasic2: boolean;

    displayMaximizable: boolean;

    displayCustomButton: boolean;

    displayResponsive: boolean;

    displayPosition: boolean;

    position: string;

    showModalDialog() {
        this.displayModal = true;
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

    showCustomButtonDialog() {
        this.headerButtonPressedCount = 0;
        this.displayCustomButton = true;
    }

    showPositionDialog(position: string) {
        this.position = position;
        this.displayPosition = true;
    }

    showResponsiveDialog() {
        this.displayResponsive = true;
    }
    
    incrementHeaderButtonPressedCount() {
        this.headerButtonPressedCount++;
    }
}
