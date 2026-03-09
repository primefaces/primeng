import { Location } from '@angular/common';
import { Component, ElementRef, Input, numberAttribute } from '@angular/core';
@Component({
    selector: 'app-docsectiontext',
    standalone: true,
    template: `
        @if (level === 2) {
            <h2 class="doc-section-label">
                {{ title }}
                <a (click)="navigate($event)" class="cursor-pointer" [id]="id">#</a>
            </h2>
        }
        @if (description) {
            <div class="doc-section-description">
                <p class="mt-4">{{ description || null }}</p>
            </div>
        }
        @if (level === 3) {
            <h3 class="doc-section-label !mt-6">
                {{ title }}
                <a (click)="navigate($event)" class="cursor-pointer" [id]="id">#</a>
            </h3>
        }
        @if (level === 4) {
            <h4 class="doc-section-label !mt-6">
                {{ title }}
                <a (click)="navigate($event)" class="cursor-pointer" [id]="id">#</a>
            </h4>
        }
        <div class="doc-section-description">
            <ng-content></ng-content>
        </div>
    `
})
export class AppDocSectionText {
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
