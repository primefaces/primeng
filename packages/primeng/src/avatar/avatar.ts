import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, inject, Input, NgModule, Output, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { AvatarStyle } from './style/avatarstyle';

/**
 * Avatar represents people using icons, labels and images.
 * @group Components
 */
@Component({
    selector: 'p-avatar',
    imports: [SharedModule],
    template: `
        <ng-content></ng-content>
        @if (label) {
            <span class="p-avatar-text">{{ label }}</span>
        } @else {
            @if (icon) {
                <span [class]="icon" [ngClass]="'p-avatar-icon'"></span>
            } @else {
                @if (image) {
                    <img [src]="image" (error)="imageError($event)" [attr.aria-label]="ariaLabel" />
                }
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.p-avatar]': 'true',
        '[class.p-component]': 'true',
        '[class.p-avatar-circle]': 'shape === "circle"',
        '[class.p-avatar-lg]': 'size === "large"',
        '[class.p-avatar-xl]': 'size === "xlarge"',
        '[class.p-avatar-image]': 'image != null',
        '[attr.data-pc-name]': '"avatar"',
        '[attr.aria-label]': 'ariaLabel',
        '[attr.aria-labelledby]': 'ariaLabelledBy',
        '[style]': 'style'
    },
    providers: [AvatarStyle]
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

    imageError(event: Event) {
        this.onImageError.emit(event);
    }

    @HostBinding('class') get hostClass(): any {
        return this.styleClass;
    }
}

@NgModule({
    imports: [Avatar, SharedModule],
    exports: [Avatar, SharedModule]
})
export class AvatarModule {}
