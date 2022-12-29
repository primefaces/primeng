import { Component } from '@angular/core';

@Component({
    templateUrl: './overlaydemo.html'
})
export class OverlayDemo {
    overlayVisible: boolean = false;

    toggle() {
        this.overlayVisible = !this.overlayVisible;
    }
}
