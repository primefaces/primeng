import { ChangeDetectionStrategy, Component, computed, inject, InjectionToken, input, NgModule, output, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import type { AvatarPassThrough, AvatarShape, AvatarSize } from 'primeng/types/avatar';
import { AvatarStyle } from './style/avatarstyle';

const AVATAR_INSTANCE = new InjectionToken<Avatar>('AVATAR_INSTANCE');

/**
 * Avatar represents people using icons, labels and images.
 * @group Components
 */
@Component({
    selector: 'p-avatar',
    standalone: true,
    imports: [SharedModule, Bind],
    template: `
        <ng-content></ng-content>
        @if (label()) {
            <span [pBind]="ptm('label')" [class]="cx('label')" [attr.data-p]="dataP()">{{ label() }}</span>
        } @else if (icon()) {
            <span [pBind]="ptm('icon')" [class]="cn(cx('icon'), icon())" [attr.data-p]="dataP()"></span>
        } @else if (image()) {
            <img [pBind]="ptm('image')" [src]="image()" (error)="imageError($event)" [attr.aria-label]="ariaLabel()" [attr.data-p]="dataP()" />
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': "cx('root')",
        '[attr.aria-label]': 'ariaLabel()',
        '[attr.aria-labelledby]': 'ariaLabelledBy()',
        '[attr.data-p]': 'dataP()'
    },
    providers: [AvatarStyle, { provide: AVATAR_INSTANCE, useExisting: Avatar }, { provide: PARENT_INSTANCE, useExisting: Avatar }],
    hostDirectives: [Bind]
})
export class Avatar extends BaseComponent<AvatarPassThrough> {
    componentName = 'Avatar';

    $pcAvatar: Avatar | undefined = inject(AVATAR_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

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
    size = input<AvatarSize>('normal');

    /**
     * Shape of the element.
     * @group Props
     */
    shape = input<AvatarShape>('square');

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
    onImageError = output<Event>();

    _componentStyle = inject(AvatarStyle);

    dataP = computed(() => {
        const shape = this.shape();
        const size = this.size();
        return this.cn({
            [shape as string]: shape,
            [size as string]: size
        });
    });

    imageError(event: Event) {
        this.onImageError.emit(event);
    }
}

@NgModule({
    imports: [Avatar, SharedModule],
    exports: [Avatar, SharedModule]
})
export class AvatarModule {}
