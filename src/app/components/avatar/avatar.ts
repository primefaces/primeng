import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    inject,
    Input,
    NgModule,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { AvatarStyle } from './style/avatarstyle';

/**
 * Avatar represents people using icons, labels and images.
 * @group Components
 */
@Component({
    selector: 'p-avatar',
    template: `
        <div
            [ngClass]="containerClass()"
            [class]="styleClass"
            [ngStyle]="style"
            [attr.aria-labelledby]="ariaLabelledBy"
            [attr.aria-label]="ariaLabel"
            [attr.data-pc-name]="'avatar'"
        >
            <ng-content></ng-content>
            <span class="p-avatar-text" *ngIf="label; else iconTemplate">{{ label }}</span>
            <ng-template #iconTemplate
                ><span [class]="icon" [ngClass]="'p-avatar-icon'" *ngIf="icon; else imageTemplate"></span
            ></ng-template>
            <ng-template #imageTemplate
                ><img [src]="image" *ngIf="image" (error)="imageError($event)" [attr.aria-label]="ariaLabel"
            /></ng-template>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.p-avatar-circle]': 'shape === "circle" && !image',
        '[class.p-avatar-lg]': 'size === "large"  && !image',
        '[class.p-avatar-xl]': 'size === "xlarge"  && !image',
        
    },
    providers: [AvatarStyle],
})
export class Avatar extends BaseComponent {
    /**
     * Defines the text to display.
     * @group Props
     */
    @Input() label: string | undefined;
    /**
     * Defines the icon to display.
     * @group Props
     */
    @Input() icon: string | undefined;
    /**
     * Defines the image to display.
     * @group Props
     */
    @Input() image: string | undefined;
    /**
     * Size of the element.
     * @group Props
     */
    @Input() size: 'normal' | 'large' | 'xlarge' | undefined = 'normal';
    /**
     * Shape of the element.
     * @group Props
     */
    @Input() shape: 'square' | 'circle' | undefined = 'square';
    /**
     * Inline style of the element.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Establishes a string value that labels the component.
     * @group Props
     */
    @Input() ariaLabel: string | undefined;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    @Input() ariaLabelledBy: string | undefined;
    /**
     * This event is triggered if an error occurs while loading an image file.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onImageError: EventEmitter<Event> = new EventEmitter<Event>();

    _componentStyle = inject(AvatarStyle);

    containerClass() {
        return {
            'p-avatar p-component': true,
            'p-avatar-image': this.image != null,
            'p-avatar-circle': this.shape === 'circle',
            'p-avatar-lg': this.size === 'large',
            'p-avatar-xl': this.size === 'xlarge',
        };
    }

    imageError(event: Event) {
        this.onImageError.emit(event);
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Avatar],
    declarations: [Avatar],
})
export class AvatarModule {}
