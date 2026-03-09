import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChild, inject, InjectionToken, input, NgModule, numberAttribute, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import type { MotionEvent, MotionOptions } from '@primeuix/motion';
import { getWindowScrollTop } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { Button } from 'primeng/button';
import type { ButtonProps } from 'primeng/button';
import { ChevronUp as ChevronUpIcon } from '@primeicons/angular/chevron-up';
import { MotionDirective } from 'primeng/motion';
import type { CSSProperties } from 'primeng/types/shared';
import type { ScrollTopIconTemplateContext, ScrollTopPassThrough, ScrollTopTarget, ScrollTopBehavior } from 'primeng/types/scrolltop';
import { ZIndexUtils } from 'primeng/utils';
import { ScrollTopStyle } from './style/scrolltopstyle';

const SCROLLTOP_INSTANCE = new InjectionToken<ScrollTop>('SCROLLTOP_INSTANCE');

/**
 * ScrollTop gets displayed after a certain scroll position and used to navigates to the top of the page quickly.
 * @group Components
 */
@Component({
    selector: 'p-scrolltop, p-scroll-top',
    standalone: true,
    imports: [NgTemplateOutlet, ChevronUpIcon, Button, SharedModule, MotionDirective],
    template: `
        @if (render()) {
            <p-button
                [pMotion]="visible()"
                [pMotionAppear]="true"
                [pMotionName]="'p-scrolltop'"
                [pMotionOptions]="computedMotionOptions()"
                (pMotionOnBeforeEnter)="onBeforeEnter($event)"
                (pMotionOnBeforeLeave)="onBeforeLeave()"
                (pMotionOnAfterLeave)="onAfterLeave()"
                [attr.aria-label]="buttonAriaLabel()"
                (click)="onClick()"
                [pt]="ptm('pcButton')"
                [styleClass]="cn(cx('root'), styleClass())"
                [style]="style()"
                type="button"
                [buttonProps]="buttonProps()"
                [unstyled]="unstyled()"
            >
                <ng-template #icon>
                    @if (!iconTemplate()) {
                        @if (_icon()) {
                            <span [class]="cn(cx('icon'), _icon())"></span>
                        } @else {
                            <svg data-p-icon="chevron-up" [class]="cx('icon')" />
                        }
                    }
                    @if (iconTemplate()) {
                        <ng-container [ngTemplateOutlet]="iconTemplate()!" [ngTemplateOutletContext]="getIconTemplateContext()"></ng-container>
                    }
                </ng-template>
            </p-button>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ScrollTopStyle, { provide: SCROLLTOP_INSTANCE, useExisting: ScrollTop }, { provide: PARENT_INSTANCE, useExisting: ScrollTop }],
    hostDirectives: [Bind]
})
export class ScrollTop extends BaseComponent<ScrollTopPassThrough> {
    componentName = 'ScrollTop';

    $pcScrollTop: ScrollTop | undefined = inject(SCROLLTOP_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    /**
     * Class of the element.
     * @group Props
     */
    styleClass = input<string>();

    /**
     * Inline style of the element.
     * @group Props
     */
    style = input<CSSProperties>();

    /**
     * Target of the ScrollTop.
     * @group Props
     */
    target = input<ScrollTopTarget>('window');

    /**
     * Defines the threshold value of the vertical scroll position of the target to toggle the visibility.
     * @group Props
     */
    threshold = input(400, { transform: numberAttribute });

    /**
     * Name of the icon or JSX.Element for icon.
     * @group Props
     */
    _icon = input<string | undefined>(undefined, { alias: 'icon' });

    /**
     * Defines the scrolling behavior, "smooth" adds an animation and "auto" scrolls with a jump.
     * @group Props
     */
    behavior = input<ScrollTopBehavior>('smooth');

    /**
     * The motion options.
     * @group Props
     */
    motionOptions = input<MotionOptions>();

    /**
     * Establishes a string value that labels the scroll-top button.
     * @group Props
     */
    buttonAriaLabel = input<string>();

    /**
     * Used to pass all properties of the ButtonProps to the Button component.
     * @group Props
     */
    buttonProps = input<ButtonProps>({ rounded: true });

    /**
     * Custom icon template.
     * @param {ScrollTopIconTemplateContext} context - icon context.
     * @see {@link ScrollTopIconTemplateContext}
     * @group Templates
     */
    iconTemplate = contentChild<TemplateRef<ScrollTopIconTemplateContext>>('icon', { descendants: false });

    computedMotionOptions = computed<MotionOptions>(() => {
        return {
            ...this.ptm('motion'),
            ...this.motionOptions()
        };
    });

    getIconTemplateContext() {
        return { styleClass: this.cx('icon') };
    }

    documentScrollListener: VoidFunction | null | undefined;

    parentScrollListener: VoidFunction | null | undefined;

    visible = signal(false);

    render = signal(false);

    overlay: HTMLElement | null = null;

    _componentStyle = inject(ScrollTopStyle);

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    onInit() {
        if (this.target() === 'window') this.bindDocumentScrollListener();
        else if (this.target() === 'parent') this.bindParentScrollListener();
    }

    onClick() {
        const scrollElement = this.target() === 'window' ? this.document.defaultView : this.el.nativeElement.parentElement;
        scrollElement?.scroll({
            top: 0,
            behavior: this.behavior()
        });
    }

    onBeforeEnter(event: MotionEvent) {
        this.overlay = event.element as HTMLElement;
        this.overlay.style.position = this.target() === 'parent' ? 'sticky' : 'fixed';
        ZIndexUtils.set('overlay', this.overlay, this.config.zIndex.overlay);
    }

    onBeforeLeave() {
        ZIndexUtils.clear(this.overlay);
        this.overlay = null;
    }

    onAfterLeave() {
        this.render.set(false);
    }

    checkVisibility(scrollY: number) {
        if (scrollY > this.threshold()) {
            this.visible.set(true);
            if (!this.render()) {
                this.render.set(true);
            }
        } else {
            this.visible.set(false);
        }
    }

    bindParentScrollListener() {
        if (isPlatformBrowser(this.platformId)) {
            this.parentScrollListener = this.renderer.listen(this.el.nativeElement.parentElement, 'scroll', () => {
                this.checkVisibility(this.el.nativeElement.parentElement.scrollTop);
            });
        }
    }

    bindDocumentScrollListener() {
        if (isPlatformBrowser(this.platformId)) {
            this.documentScrollListener = this.renderer.listen(this.document.defaultView, 'scroll', () => {
                this.checkVisibility(getWindowScrollTop());
            });
        }
    }

    unbindParentScrollListener() {
        if (this.parentScrollListener) {
            this.parentScrollListener();
            this.parentScrollListener = null;
        }
    }

    unbindDocumentScrollListener() {
        if (this.documentScrollListener) {
            this.documentScrollListener();
            this.documentScrollListener = null;
        }
    }

    onDestroy() {
        if (this.target() === 'window') this.unbindDocumentScrollListener();
        else if (this.target() === 'parent') this.unbindParentScrollListener();

        if (this.overlay) {
            ZIndexUtils.clear(this.overlay);
            this.overlay = null;
        }
    }
}

@NgModule({
    imports: [ScrollTop, SharedModule],
    exports: [ScrollTop, SharedModule]
})
export class ScrollTopModule {}
