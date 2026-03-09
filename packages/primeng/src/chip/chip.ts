import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, inject, InjectionToken, input, NgModule, output, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { SharedModule, TranslationKeys } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { ChipProps, ChipPassThrough } from 'primeng/types/chip';
import { ChipStyle } from './style/chipstyle';
import { TimesCircle as TimesCircleIcon } from '@primeicons/angular/times-circle';

const CHIP_INSTANCE = new InjectionToken<Chip>('CHIP_INSTANCE');

/**
 * Chip represents people using icons, labels and images.
 * @group Components
 */
@Component({
    selector: 'p-chip',
    standalone: true,
    imports: [NgTemplateOutlet, SharedModule, Bind, TimesCircleIcon],
    template: `
        <ng-content />
        @if (_image()) {
            <img [pBind]="ptm('image')" [class]="cx('image')" [src]="_image()" (error)="imageError($event)" [alt]="_alt()" />
        } @else if (_icon()) {
            <span [pBind]="ptm('icon')" [class]="cn(cx('icon'), _icon())"></span>
        }
        @if (_label()) {
            <div [pBind]="ptm('label')" [class]="cx('label')">{{ _label() }}</div>
        }
        @if (_removable()) {
            @if (!removeIconTemplate()) {
                @if (_removeIcon()) {
                    <span
                        [pBind]="ptm('removeIcon')"
                        [class]="cn(cx('removeIcon'), _removeIcon())"
                        (click)="close($event)"
                        (keydown)="onKeydown($event)"
                        [attr.tabindex]="removeIconTabindex()"
                        [attr.aria-label]="removeAriaLabel()"
                        role="button"
                    ></span>
                } @else {
                    <svg
                        [pBind]="ptm('removeIcon')"
                        data-p-icon="times-circle"
                        [class]="cx('removeIcon')"
                        (click)="close($event)"
                        (keydown)="onKeydown($event)"
                        [attr.tabindex]="removeIconTabindex()"
                        [attr.aria-label]="removeAriaLabel()"
                        role="button"
                    />
                }
            } @else {
                <span [pBind]="ptm('removeIcon')" [attr.tabindex]="removeIconTabindex()" [class]="cx('removeIcon')" (click)="close($event)" (keydown)="onKeydown($event)" [attr.aria-label]="removeAriaLabel()" role="button">
                    <ng-template *ngTemplateOutlet="removeIconTemplate()"></ng-template>
                </span>
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ChipStyle, { provide: CHIP_INSTANCE, useExisting: Chip }, { provide: PARENT_INSTANCE, useExisting: Chip }],
    host: {
        '[class]': "cx('root')",
        '[style]': "sx('root')",
        '[attr.aria-label]': '_label()',
        '[attr.data-p]': 'dataP()'
    },
    hostDirectives: [Bind]
})
export class Chip extends BaseComponent<ChipPassThrough> {
    componentName = 'Chip';

    $pcChip: Chip | undefined = inject(CHIP_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked() {
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
     * Alt attribute of the image.
     * @group Props
     */
    alt = input<string>();
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    disabled = input(false, { transform: booleanAttribute });
    /**
     * Whether to display a remove icon.
     * @group Props
     */
    removable = input(false, { transform: booleanAttribute });
    /**
     * Icon of the remove element.
     * @group Props
     */
    removeIcon = input<string>();
    /**
     * Used to pass all properties of the chipProps to the Chip component.
     * @group Props
     */
    chipProps = input<ChipProps>();
    /**
     * Callback to invoke when a chip is removed.
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    onRemove = output<MouseEvent>();
    /**
     * This event is triggered if an error occurs while loading an image file.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onImageError = output<Event>();

    /**
     * Custom remove icon template.
     * @group Templates
     */
    removeIconTemplate = contentChild<TemplateRef<void>>('removeicon', { descendants: false });

    visible = signal(true);

    _componentStyle = inject(ChipStyle);

    _label = computed(() => this.chipProps()?.label ?? this.label());

    _icon = computed(() => this.chipProps()?.icon ?? this.icon());

    _image = computed(() => this.chipProps()?.image ?? this.image());

    _alt = computed(() => this.chipProps()?.alt ?? this.alt());

    _removable = computed(() => this.chipProps()?.removable ?? this.removable());

    _removeIcon = computed(() => this.chipProps()?.removeIcon ?? this.removeIcon());

    removeAriaLabel = computed(() => this.translate(TranslationKeys.ARIA, 'removeLabel'));

    removeIconTabindex = computed(() => (this.disabled() ? -1 : 0));

    dataP = computed(() =>
        this.cn({
            removable: this._removable()
        })
    );

    close(event: MouseEvent | KeyboardEvent) {
        this.visible.set(false);
        this.onRemove.emit(event as MouseEvent);
    }

    onKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter' || event.key === 'Backspace') {
            this.close(event);
        }
    }

    imageError(event: Event) {
        this.onImageError.emit(event);
    }
}

@NgModule({
    imports: [Chip, SharedModule],
    exports: [Chip, SharedModule]
})
export class ChipModule {}
