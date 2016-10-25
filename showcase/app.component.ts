import {Component} from '@angular/core';

@Component({
    selector: 'primeng-showcase',
    templateUrl: 'showcase/app.component.html'
})
export class AppComponent {

    activeMenuId: string;

    themesVisible: boolean = false;

    mobileMenuActive: boolean = false;

    toggleMenu(e) {
        this.mobileMenuActive = !this.mobileMenuActive;
        e.preventDefault();
    }
}