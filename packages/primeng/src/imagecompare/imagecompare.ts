import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, contentChild, inject, InjectionToken, input, NgModule, TemplateRef, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { ImageComparePassThrough } from 'primeng/types/imagecompare';
import { ImageCompareStyle } from './style/imagecomparestyle';

const IMAGECOMPARE_INSTANCE = new InjectionToken<ImageCompare>('IMAGECOMPARE_INSTANCE');

/**
 * Compare two images side by side with a slider.
 * @group Components
 */
@Component({
    selector: 'p-image-compare, p-imagecompare',
    standalone: true,
    imports: [NgTemplateOutlet, SharedModule, BindModule],
    template: `
        <ng-container *ngTemplateOutlet="leftTemplate()"></ng-container>
        <ng-container *ngTemplateOutlet="rightTemplate()"></ng-container>
        <input type="range" min="0" max="100" value="50" (input)="onSlide($event)" [class]="cx('slider')" [pBind]="ptm('slider')" />
    `,
    host: {
        '[class]': "cx('root')",
        '[attr.tabindex]': 'tabindex()',
        '[attr.aria-labelledby]': 'ariaLabelledby()',
        '[attr.aria-label]': 'ariaLabel()'
    },
    hostDirectives: [Bind],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ImageCompareStyle, { provide: IMAGECOMPARE_INSTANCE, useExisting: ImageCompare }, { provide: PARENT_INSTANCE, useExisting: ImageCompare }]
})
export class ImageCompare extends BaseComponent<ImageComparePassThrough> {
    componentName = 'ImageCompare';

    $pcImageCompare: ImageCompare | undefined = inject(IMAGECOMPARE_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    /**
     * Index of the element in tabbing order.
     * @defaultValue 0
     * @group Props
     */
    tabindex = input<number>();

    /**
     * Defines a string value that labels an interactive element.
     * @group Props
     */
    ariaLabelledby = input<string>();

    /**
     * Identifier of the underlying input element.
     * @group Props
     */
    ariaLabel = input<string>();

    /**
     * Custom left side template.
     * @group Templates
     */
    leftTemplate = contentChild<TemplateRef<void>>('left', { descendants: false });

    /**
     * Custom right side template.
     * @group Templates
     */
    rightTemplate = contentChild<TemplateRef<void>>('right', { descendants: false });

    _componentStyle = inject(ImageCompareStyle);

    mutationObserver: MutationObserver;

    isRTL: boolean = false;

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    onInit() {
        this.updateDirection();
        this.observeDirectionChanges();
    }

    onSlide(event: Event) {
        const target = event.target as HTMLInputElement;
        const value = target.value;
        const image = target.previousElementSibling as HTMLElement | null;

        if (image) {
            if (this.isRTL) {
                image.style.clipPath = `polygon(${100 - +value}% 0, 100% 0, 100% 100%, ${100 - +value}% 100%)`;
            } else {
                image.style.clipPath = `polygon(0 0, ${value}% 0, ${value}% 100%, 0 100%)`;
            }
        }
    }

    updateDirection() {
        this.isRTL = !!this.el.nativeElement.closest('[dir="rtl"]');
    }

    observeDirectionChanges() {
        if (isPlatformBrowser(this.platformId)) {
            const targetNode = document?.documentElement;
            const config = { attributes: true, attributeFilter: ['dir'] };

            this.mutationObserver = new MutationObserver(() => {
                this.updateDirection();
            });

            this.mutationObserver.observe(targetNode, config);
        }
    }

    onDestroy() {
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
        }
    }
}

@NgModule({
    imports: [ImageCompare, SharedModule],
    exports: [ImageCompare, SharedModule]
})
export class ImageCompareModule {}
