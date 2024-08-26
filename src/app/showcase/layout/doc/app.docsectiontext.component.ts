import { Location } from '@angular/common';
import { Component, ElementRef, Input, numberAttribute } from '@angular/core';

@Component({
    selector: 'app-docsectiontext',
    template: `
        <h2 class="doc-section-label" *ngIf="level === 2">
            {{ title }}
            <a (click)="navigate($event)" class="cursor-pointer" [id]="id">#</a>
        </h2>
        <div class="doc-section-description" *ngIf="description">
            <p class="mt-4">{{ description || null }}</p>
        </div>
        <h3 class="doc-section-label mt-6" *ngIf="level === 3">
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

    @Input({ transform: numberAttribute }) level!: number;

    @Input() label!: string;

    @Input() description: string;

    constructor(
        public location: Location,
        public el: ElementRef
    ) {}

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
