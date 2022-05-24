import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'p-skeleton',
    template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="containerStyle()">
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./skeleton.css'],
    host: {
        'class': 'p-element'
    }
})
export class Skeleton {

    @Input() styleClass: string;

    @Input() style: any;

    @Input() shape: string = "rectangle";

    @Input() animation: string = "wave";

    @Input() borderRadius: string = null;

    @Input() size: string = null;

    @Input() width: string = "100%";

    @Input() height: string = "1rem";

    containerClass() {
        return {
            'p-skeleton p-component': true,
            'p-skeleton-circle': this.shape === 'circle',
            'p-skeleton-none': this.animation === 'none'
        };
    }

    containerStyle() {
        if (this.size)
                return {...this.style, width: this.size, height: this.size, borderRadius: this.borderRadius};
            else
                return {...this.style, width: this.width, height: this.height, borderRadius: this.borderRadius};
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Skeleton],
    declarations: [Skeleton]
})
export class SkeletonModule { }
