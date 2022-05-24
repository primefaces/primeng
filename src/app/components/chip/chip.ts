import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'p-chip',
    template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style" *ngIf="visible">
            <ng-content></ng-content>
            <img [src]="image" *ngIf="image;else iconTemplate">
            <ng-template #iconTemplate><span *ngIf="icon" [class]="icon" [ngClass]="'p-chip-icon'"></span></ng-template>
            <div class="p-chip-text" *ngIf="label">{{label}}</div>
            <span *ngIf="removable" tabindex="0" [class]="removeIcon" [ngClass]="'pi-chip-remove-icon'" (click)="close($event)" (keydown.enter)="close($event)"></span>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./chip.css'],
    host: {
        'class': 'p-element'
    }
})
export class Chip {

    @Input() label: string;

    @Input() icon: string;

    @Input() image: string;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() removable: boolean;

    @Input() removeIcon: string = "pi pi-times-circle";

    @Output() onRemove: EventEmitter<any> = new EventEmitter();

    visible: boolean = true;

    containerClass() {
        return {
            'p-chip p-component': true,
            'p-chip-image': this.image != null
        };
    }

    close(event) {
        this.visible = false;
        this.onRemove.emit(event)
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Chip],
    declarations: [Chip]
})
export class ChipModule { }
