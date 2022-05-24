import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'p-avatar',
    template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <ng-content></ng-content>
            <span class="p-avatar-text" *ngIf="label; else iconTemplate">{{label}}</span>
            <ng-template #iconTemplate><span [class]="icon" [ngClass]="'p-avatar-icon'" *ngIf="icon; else imageTemplate"></span></ng-template>
            <ng-template #imageTemplate><img [src]="image" *ngIf="image"></ng-template>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./avatar.css'],
    host: {
        'class': 'p-element'
    }
})
export class Avatar {

    @Input() label: string;

    @Input() icon: string;

    @Input() image: string;

    @Input() size: string = "normal";

    @Input() shape: string = "square";

    @Input() style: any;

    @Input() styleClass: string;

    containerClass() {
        return {
            'p-avatar p-component': true,
            'p-avatar-image': this.image != null,
            'p-avatar-circle': this.shape === 'circle',
            'p-avatar-lg': this.size === 'large',
            'p-avatar-xl': this.size === 'xlarge'
        };
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Avatar],
    declarations: [Avatar]
})
export class AvatarModule { }
