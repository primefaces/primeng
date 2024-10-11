import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    OutputEmitterRef,
    HostBinding,
    inject,
    input,
    NgModule,
    output,
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
        <ng-content></ng-content>
        @if (label()) {
          <span class="p-avatar-text">{{ label() }}</span>
        } @else {
          @if (icon()) {
            <span [class]="icon()" [ngClass]="'p-avatar-icon'"></span>
          } @else {
            @if (image()) {
              <img [src]="image()" (error)="imageError($event)" [attr.aria-label]="ariaLabel()" />
            }
          }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.p-avatar]': 'true',
        '[class.p-component]': 'true',
        '[class.p-avatar-circle]': 'shape() === "circle"',
        '[class.p-avatar-lg]': 'size() === "large"',
        '[class.p-avatar-xl]': 'size() === "xlarge"',
        '[class.p-avatar-image]': 'image() != null',
        '[attr.data-pc-name]': 'avatar',
        '[attr.aria-label]': 'ariaLabel()',
        '[attr.aria-labelledby]': 'ariaLabelledBy()',
        '[style]': 'style()',
    },
    providers: [AvatarStyle],
})
export class Avatar extends BaseComponent {
    /**
     * Defines the text to display.
     * @group Props
     */
    label = input<string>();
    /**
     * Defines the icon to display.
     * @group Props
     */
    icon = input<string>();
    /**
     * Defines the image to display.
     * @group Props
     */
    image = input<string>();
    /**
     * Size of the element.
     * @group Props
     */
    size = input<'normal' | 'large' | 'xlarge'>('normal');
    /**
     * Shape of the element.
     * @group Props
     */
    shape = input<'square' | 'circle'>('square');
    /**
     * Inline style of the element.
     * @group Props
     */
    style = input<{ [klass: string]: any } | null>();
    /**
     * Class of the element.
     * @group Props
     */
    styleClass = input<string>();
    /**
     * Establishes a string value that labels the component.
     * @group Props
     */
    ariaLabel = input<string>();
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     * @group Props
     */
    ariaLabelledBy = input<string>();
    /**
     * This event is triggered if an error occurs while loading an image file.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onImageError: OutputEmitterRef<Event> = output<Event>();

    _componentStyle = inject(AvatarStyle);

    imageError(event: Event) {
        this.onImageError.emit(event);
    }

    @HostBinding('class') get hostClass(): any {
        return this.styleClass();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Avatar],
    declarations: [Avatar],
})
export class AvatarModule {}
