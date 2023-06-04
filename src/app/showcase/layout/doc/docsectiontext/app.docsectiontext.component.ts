import { ChangeDetectorRef, Component, ElementRef, Input } from '@angular/core';
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

    @Input() label!: string;

    @Input() parentTitle: string;

    @Input() parentId: string;

    constructor(public location: Location, private router: Router, public el: ElementRef, public cd: ChangeDetectorRef) {}

    navigate(event) {
        if (typeof window !== undefined) {
            const hash = window.location.hash.substring(1);
            const parentElement = event.currentTarget.parentElement;
            this.location.go(this.location.path().split('#')[0] + '#' + this.id);

            setTimeout(() => {
                parentElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
            }, 1);

            hash === this.id && event.preventDefault();
        }
    }
}
