import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ElementRef, HostListener, inject, input, linkedSignal, model, numberAttribute, output, viewChild } from '@angular/core';
import { uuid } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { TimesIcon } from 'primeng/icons';
import type { GalleriaPassThrough } from 'primeng/types/galleria';
import type { Galleria } from './galleria';
import { GalleriaItem } from './galleria-item';
import { GalleriaItemSlot } from './galleria-item-slot';
import { GALLERIA_INSTANCE } from './galleria-token';
import { GalleriaThumbnails } from './galleria-thumbnails';
import { GalleriaStyle } from './style/galleriastyle';

@Component({
    selector: 'div[pGalleriaContent]',
    standalone: true,
    imports: [NgTemplateOutlet, BindModule, TimesIcon, GalleriaItemSlot, GalleriaItem, GalleriaThumbnails],
    template: `
        @if (hasValue()) {
            @if (galleria.fullScreen()) {
                <button type="button" [pBind]="getPTOptions('closeButton')" [class]="cx('closeButton')" (click)="maskHide.emit(true)" [attr.aria-label]="closeAriaLabel()">
                    @if (!galleria.closeIconTemplate()) {
                        <svg data-p-icon="times" [pBind]="getPTOptions('closeIcon')" [class]="cx('closeIcon')" />
                    }
                    <ng-template [ngTemplateOutlet]="galleria.closeIconTemplate()"></ng-template>
                </button>
            }
            @if (shouldRenderHeader()) {
                <div pGalleriaItemSlot [unstyled]="unstyled()" type="header" [pBind]="getPTOptions('header')" [class]="cx('header')"></div>
            }
            <div [pBind]="getPTOptions('content')" [class]="cx('content')" [attr.aria-live]="contentAriaLive()">
                <div
                    pGalleriaItem
                    [id]="id()"
                    [value]="value()"
                    [activeIndex]="_activeIndex()"
                    [circular]="galleria.circular()"
                    (onActiveIndexChange)="onActiveIndexChange($event)"
                    [showIndicators]="galleria.showIndicators()"
                    [changeItemOnIndicatorHover]="galleria.changeItemOnIndicatorHover()"
                    [showItemNavigators]="galleria.showItemNavigators()"
                    [autoPlay]="galleria.autoPlay()"
                    [slideShowActive]="slideShowActive"
                    (startSlideShow)="startSlideShow()"
                    (stopSlideShow)="stopSlideShow()"
                    [pt]="pt()"
                    [unstyled]="unstyled()"
                    [class]="cx('itemsContainer')"
                ></div>

                @if (galleria.showThumbnails()) {
                    <div
                        pGalleriaThumbnails
                        [containerId]="id()"
                        [value]="value()"
                        (onActiveIndexChange)="onActiveIndexChange($event)"
                        [activeIndex]="_activeIndex()"
                        [numVisible]="numVisible()"
                        [responsiveOptions]="galleria.responsiveOptions()"
                        [circular]="galleria.circular()"
                        [isVertical]="isVertical()"
                        [contentHeight]="galleria.verticalThumbnailViewPortHeight()"
                        [showThumbnailNavigators]="galleria.showThumbnailNavigators()"
                        [slideShowActive]="slideShowActive"
                        (stopSlideShow)="stopSlideShow()"
                        [pt]="pt()"
                        [unstyled]="unstyled()"
                    ></div>
                }
            </div>
            @if (shouldRenderFooter()) {
                <div pGalleriaItemSlot [pBind]="getPTOptions('footer')" [class]="cx('footer')" type="footer" [unstyled]="unstyled()"></div>
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [GalleriaStyle],
    host: {
        '[attr.id]': 'id()',
        '[attr.role]': '"region"',
        '[style]': 'hostStyle()',
        '[class]': "cx('root')"
    },
    hostDirectives: [Bind]
})
export class GalleriaContent extends BaseComponent<GalleriaPassThrough> {
    hostName: string = 'Galleria';

    galleria = inject<Galleria>(GALLERIA_INSTANCE);

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.getPTOptions('root'));
    }

    value = input<any[]>([]);

    numVisible = input<number>();

    fullScreen = model(false);

    activeIndexInput = input<number>(0, { alias: 'activeIndex' });

    maskHide = output<boolean>();

    activeItemChange = output<number>();

    closeButton = viewChild<ElementRef>('closeButton');

    _componentStyle = inject(GalleriaStyle);

    $pcGalleria: Galleria | undefined = inject(GALLERIA_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    private _generatedId = uuid('pn_id_');

    id = computed(() => this.galleria.id() || this._generatedId);

    _activeIndex = linkedSignal(() => this.activeIndexInput());

    slideShowActive = true;

    interval: any;

    hostStyle = computed(() => (!this.galleria.fullScreen() ? this.galleria.containerStyle() : {}));

    contentAriaLive = computed(() => (this.galleria.autoPlay() ? 'polite' : 'off'));

    isVertical = computed(() => this.galleria.thumbnailsPosition() === 'left' || this.galleria.thumbnailsPosition() === 'right');

    hasValue = computed(() => {
        const val = this.value();
        return val && val.length > 0;
    });

    // For custom fullscreen
    @HostListener('document:fullscreenchange')
    handleFullscreenChange() {
        if (document?.fullscreenElement === this.el.nativeElement?.children[0]) {
            this.fullScreen.set(true);
        } else {
            this.fullScreen.set(false);
        }
    }

    shouldRenderHeader() {
        return !!this.galleria.headerTemplate();
    }

    shouldRenderFooter() {
        return !!this.galleria.footerTemplate();
    }

    startSlideShow() {
        if (isPlatformBrowser(this.galleria.platformId)) {
            if (this.interval) {
                clearInterval(this.interval);
            }
            this.interval = setInterval(() => {
                let activeIndex = this.galleria.circular() && this.value()!.length - 1 === this._activeIndex() ? 0 : this._activeIndex() + 1;
                this.onActiveIndexChange(activeIndex);
                this._activeIndex.set(activeIndex);
            }, this.galleria.transitionInterval());

            this.slideShowActive = true;
        }
    }

    stopSlideShow() {
        if (this.galleria.autoPlay() && !this.galleria.shouldStopAutoplayByClick()) {
            return;
        }

        if (this.interval) {
            clearInterval(this.interval);
        }

        this.slideShowActive = false;
    }

    getPositionClass(preClassName: string, position: string) {
        const positions = ['top', 'left', 'bottom', 'right'];
        const pos = positions.find((item) => item === position);

        return pos ? `${preClassName}-${pos}` : '';
    }

    onActiveIndexChange(index: number) {
        if (this._activeIndex() !== index) {
            this._activeIndex.set(index);
            this.activeItemChange.emit(this._activeIndex());
        }
    }

    closeAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.close : undefined;
    }

    onDestroy() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    getPTOptions(key: string) {
        return this.ptm(key, {
            context: {
                pt: this.pt(),
                unstyled: this.unstyled()
            }
        });
    }
}
