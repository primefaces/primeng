import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, effect, inject, input, linkedSignal, output } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { ChevronLeft as ChevronLeftIcon } from '@primeicons/angular/chevron-left';
import { ChevronRight as ChevronRightIcon } from '@primeicons/angular/chevron-right';
import type { GalleriaPassThrough } from 'primeng/types/galleria';
import type { Galleria } from './galleria';
import { GalleriaItemSlot } from './galleria-item-slot';
import { GALLERIA_INSTANCE } from './galleria-token';
import { GalleriaStyle } from './style/galleriastyle';

@Component({
    selector: 'div[pGalleriaItem]',
    standalone: true,
    imports: [NgTemplateOutlet, BindModule, ChevronLeftIcon, ChevronRightIcon, GalleriaItemSlot],
    template: `
        <div [pBind]="ptm('items')" [class]="cx('items')">
            @if (showItemNavigators()) {
                <button type="button" role="navigation" [pBind]="ptm('prevButton')" [class]="cx('prevButton')" (click)="navBackward($event)" (focus)="onButtonFocus('left')" (blur)="onButtonBlur('left')" data-pc-group-section="itemnavigator">
                    @if (!galleria.itemPreviousIconTemplate()) {
                        <svg data-p-icon="chevron-left" [pBind]="ptm('prevIcon')" [class]="cx('prevIcon')" />
                    }
                    <ng-template [ngTemplateOutlet]="galleria.itemPreviousIconTemplate()"></ng-template>
                </button>
            }
            <div
                pGalleriaItemSlot
                [pBind]="ptm('item')"
                [unstyled]="unstyled()"
                [class]="cx('item')"
                [item]="activeItem()"
                [id]="activeItemId()"
                role="group"
                [attr.aria-label]="ariaSlideNumber(_activeIndex() + 1)"
                [attr.aria-roledescription]="ariaSlideLabel()"
            ></div>
            @if (showItemNavigators()) {
                <button type="button" [pBind]="ptm('nextButton')" [class]="cx('nextButton')" (click)="navForward($event)" role="navigation" (focus)="onButtonFocus('right')" (blur)="onButtonBlur('right')" data-pc-group-section="itemnavigator">
                    @if (!galleria.itemNextIconTemplate()) {
                        <svg data-p-icon="chevron-right" [pBind]="ptm('nextIcon')" [class]="cx('nextIcon')" />
                    }
                    <ng-template [ngTemplateOutlet]="galleria.itemNextIconTemplate()"></ng-template>
                </button>
            }
            @if (galleria.captionTemplate()) {
                <div pGalleriaItemSlot [pBind]="ptm('caption')" [unstyled]="unstyled()" [class]="cx('caption')" type="caption" [item]="activeItem()"></div>
            }
        </div>
        @if (showIndicators()) {
            <ul [pBind]="ptm('indicatorList')" [class]="cx('indicatorList')">
                @for (item of value(); track item) {
                    <li
                        [pBind]="getIndicatorPTOptions($index)"
                        tabindex="0"
                        (click)="onIndicatorClick($index)"
                        (mouseenter)="onIndicatorMouseEnter($index)"
                        (keydown)="onIndicatorKeyDown($event, $index)"
                        [class]="cx('indicator', { index: $index })"
                        [attr.aria-label]="ariaPageLabel($index + 1)"
                        [attr.aria-selected]="_activeIndex() === $index"
                        [attr.aria-controls]="id() + '_item_' + $index"
                        [pBind]="ptm('indicator', getIndicatorPTOptions($index))"
                        [attr.data-p-active]="isIndicatorItemActive($index)"
                    >
                        @if (!galleria.indicatorTemplate()) {
                            <button type="button" tabIndex="-1" [pBind]="ptm('indicatorButton', getIndicatorPTOptions($index))" [class]="cx('indicatorButton')"></button>
                        } @else {
                            <div pGalleriaItemSlot type="indicator" [index]="$index" [pBind]="ptm('item')" [unstyled]="unstyled()"></div>
                        }
                    </li>
                }
            </ul>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [GalleriaStyle],
    hostDirectives: [Bind]
})
export class GalleriaItem extends BaseComponent<GalleriaPassThrough> {
    hostName: string = 'Galleria';

    galleria = inject<Galleria>(GALLERIA_INSTANCE);

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptm('itemsContainer'));
    }

    id = input<string>();

    circular = input(false, { transform: booleanAttribute });

    value = input<any[]>();

    showItemNavigators = input(false, { transform: booleanAttribute });

    showIndicators = input(true, { transform: booleanAttribute });

    slideShowActive = input(true, { transform: booleanAttribute });

    changeItemOnIndicatorHover = input(true, { transform: booleanAttribute });

    autoPlay = input(false, { transform: booleanAttribute });

    startSlideShow = output<void>();

    stopSlideShow = output<void>();

    onActiveIndexChange = output<number>();

    _componentStyle = inject(GalleriaStyle);

    _activeIndex = linkedSignal(() => this.activeIndexInput());

    activeItem = computed(() => {
        const val = this.value();
        return val && val[this._activeIndex()];
    });

    activeItemId = computed(() => this.id() + '_item_' + this._activeIndex());

    leftButtonFocused = false;

    rightButtonFocused = false;

    private get aria() {
        return this.galleria.config.translation.aria;
    }

    constructor() {
        super();

        // Handle autoPlay changes
        effect(() => {
            const auto = this.autoPlay();
            if (auto) {
                this.startSlideShow.emit();
            }
        });
    }

    activeIndexInput = input<number>(0, { alias: 'activeIndex' });

    getIndicatorPTOptions(index: number) {
        return this.ptm('indicator', {
            context: {
                highlighted: this._activeIndex() === index
            }
        });
    }

    next() {
        const val = this.value();
        const currentIndex = this._activeIndex();
        let nextItemIndex = currentIndex + 1;
        let activeIndex = this.circular() && val!.length - 1 === currentIndex ? 0 : nextItemIndex;
        this.onActiveIndexChange.emit(activeIndex);
    }

    prev() {
        const val = this.value();
        const currentIndex = this._activeIndex();
        let prevItemIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
        let activeIndex = this.circular() && currentIndex === 0 ? val!.length - 1 : prevItemIndex;
        this.onActiveIndexChange.emit(activeIndex);
    }

    onButtonFocus(pos: 'left' | 'right') {
        if (pos === 'left') {
            this.leftButtonFocused = true;
        } else this.rightButtonFocused = true;
    }

    onButtonBlur(pos: 'left' | 'right') {
        if (pos === 'left') {
            this.leftButtonFocused = false;
        } else this.rightButtonFocused = false;
    }

    stopTheSlideShow() {
        if (this.slideShowActive()) {
            this.stopSlideShow.emit();
        }
    }

    navForward(e: MouseEvent) {
        this.stopTheSlideShow();
        this.next();

        if (e && e.cancelable) {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    navBackward(e: MouseEvent) {
        this.stopTheSlideShow();
        this.prev();

        if (e && e.cancelable) {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    onIndicatorClick(index: number) {
        this.stopTheSlideShow();
        this.onActiveIndexChange.emit(index);
    }

    onIndicatorMouseEnter(index: number) {
        if (this.changeItemOnIndicatorHover()) {
            this.stopTheSlideShow();
            this.onActiveIndexChange.emit(index);
        }
    }

    onIndicatorKeyDown(event: KeyboardEvent, index: number) {
        switch (event.code) {
            case 'Enter':
            case 'Space':
                this.stopTheSlideShow();
                this.onActiveIndexChange.emit(index);
                event.preventDefault();
                break;

            case 'ArrowDown':
            case 'ArrowUp':
                event.preventDefault();
                break;

            default:
                break;
        }
    }

    isNavForwardDisabled() {
        const val = this.value();
        return !this.circular() && this._activeIndex() === val!.length - 1;
    }

    isNavBackwardDisabled() {
        return !this.circular() && this._activeIndex() === 0;
    }

    isIndicatorItemActive(index: number) {
        return this._activeIndex() === index;
    }

    ariaSlideLabel() {
        return this.aria?.slide;
    }

    ariaSlideNumber(value: any) {
        return this.aria?.slideNumber?.replace(/{slideNumber}/g, value);
    }

    ariaPageLabel(value: any) {
        return this.aria?.pageLabel?.replace(/{page}/g, value);
    }
}
