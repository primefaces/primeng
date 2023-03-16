import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-docsectiontext',
    templateUrl: './app.docsectiontext.component.html'
})
export class AppDocSectionTextComponent {
    @Input() title!: string;

    @Input() id!: string;

    @Input() level: number = 2;

    constructor(public location: Location, private router: Router) {}

    navigate(event) {
        const hash = window.location.hash.substring(1);
        const parentElement = event.currentTarget.parentElement;
        this.location.go(this.location.path().split('#')[0] + '#' + this.id);

        setTimeout(() => {
            parentElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }, 1);

        hash === this.id && event.preventDefault();
    }
}
