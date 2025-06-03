import { CommonModule } from '@angular/common';
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
    standalone: true,
    imports: [CommonModule, SharedModule],
    template: `
        <ng-content></ng-content>
        <span [class]="cx('label')" *ngIf="label; else iconTemplate">{{ label }}</span>
        <ng-template #iconTemplate><span [class]="icon" [ngClass]="cx('icon')" *ngIf="icon; else imageTemplate"></span></ng-template>
        <ng-template #imageTemplate> <img [src]="image" *ngIf="image" (error)="imageError($event)" [attr.aria-label]="ariaLabel" /></ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "cx('root')",
        '[attr.data-pc-name]': '"avatar"',
        '[attr.aria-label]': 'ariaLabel',
        '[attr.aria-labelledby]': 'ariaLabelledBy'
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
     * Class of the element.
     * @deprecated since v20.0.0, use `class` instead.
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
}

@NgModule({
    imports: [Avatar, SharedModule],
    exports: [Avatar, SharedModule]
})
export class AvatarModule {}
