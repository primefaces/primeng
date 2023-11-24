import { ChangeDetectorRef, Component, ElementRef, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-docsectiontext',
    template: `
        <h2 class="doc-section-label" *ngIf="level === 2">
            {{ title }}
            <a (click)="navigate($event)" class="cursor-pointer" [id]="id">#</a>
        </h2>
        <div class="doc-section-description" *ngIf="description">
            <p class="mt-3">{{ description || null }}</p>
        </div>
        <h3 class="doc-section-label" *ngIf="level === 3">
            {{ title }}
            <a (click)="navigate($event)" class="cursor-pointer" [id]="id">#</a>
        </h3>
        <div class="doc-section-description">
            <ng-content></ng-content>
        </div>
    `
})
export class AppDocSectionTextComponent {
    @Input() title!: string;

    @Input() id!: string;

    @Input() level!: number;

    @Input() label!: string;

    @Input() description: string;

    constructor(public location: Location, private router: Router, public el: ElementRef, public cd: ChangeDetectorRef) {}

    navigate(event, parentClick = false) {
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
