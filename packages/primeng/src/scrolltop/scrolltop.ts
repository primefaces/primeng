import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, inject, Input, NgModule, numberAttribute, OnDestroy, OnInit, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { getWindowScrollTop } from '@primeuix/utils';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { Button, ButtonProps } from 'primeng/button';
import { ChevronUpIcon } from 'primeng/icons';
import { ZIndexUtils } from 'primeng/utils';
import { ScrollTopStyle } from './style/scrolltopstyle';

/**
 * ScrollTop gets displayed after a certain scroll position and used to navigates to the top of the page quickly.
 * @group Components
 */
@Component({
    selector: 'p-scrollTop, p-scrolltop, p-scroll-top',
    standalone: true,
    imports: [CommonModule, ChevronUpIcon, Button, SharedModule],
    template: `
        <p-button
            *ngIf="visible"
            [@animation]="{
                value: 'open',
                params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions }
            }"
            (@animation.start)="onEnter($event)"
            (@animation.done)="onLeave($event)"
            [attr.aria-label]="buttonAriaLabel"
            (click)="onClick()"
            [styleClass]="getStyleClass()"
            [ngStyle]="style"
            type="button"
            [buttonProps]="buttonProps"
        >
            <ng-template #icon>
                <ng-container *ngIf="!iconTemplate">
                    <span *ngIf="_icon" [class]="_icon" [ngClass]="'p-scrolltop-icon'"></span>
                    <ChevronUpIcon *ngIf="!_icon" [styleClass]="'p-scrolltop-icon'" [ngStyle]="{ 'font-size': '1rem', scale: '1.5' }" />
                </ng-container>
                <ng-template [ngIf]="!icon" *ngTemplateOutlet="iconTemplate; context: { styleClass: 'p-scrolltop-icon' }"></ng-template>
            </ng-template>
        </p-button>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('animation', [
            state(
                'void',
                style({
                    opacity: 0
                })
            ),
            state(
                'open',
                style({
                    opacity: 1
                })
            ),
            transition('void => open', animate('{{showTransitionParams}}')),
            transition('open => void', animate('{{hideTransitionParams}}'))
        ])
    ],

    providers: [ScrollTopStyle]
})
export class ScrollTop extends BaseComponent implements OnInit, OnDestroy {
    /**
     * Class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Inline style of the element.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Target of the ScrollTop.
     * @group Props
     */
    @Input() target: 'window' | 'parent' | undefined = 'window';
    /**
     * Defines the threshold value of the vertical scroll position of the target to toggle the visibility.
     * @group Props
     */
    @Input({ transform: numberAttribute }) threshold: number = 400;
    /**
     * Name of the icon or JSX.Element for icon.
     * @group Props
     */
    @Input() get icon(): string | undefined {
        return this._icon;
    }
    /**
     * Defines the scrolling behavior, "smooth" adds an animation and "auto" scrolls with a jump.
     * @group Props
     */
    @Input() behavior: 'auto' | 'smooth' | undefined = 'smooth';
    /**
     * A string value used to determine the display transition options.
     * @group Props
     */
    @Input() showTransitionOptions: string = '.15s';
    /**
     * A string value used to determine the hiding transition options.
     * @group Props
     */
    @Input() hideTransitionOptions: string = '.15s';
    /**
     * Establishes a string value that labels the scroll-top button.
     * @group Props
     */
    @Input() buttonAriaLabel: string | undefined;
    /**
     * Used to pass all properties of the ButtonProps to the Button component.
     * @group Props
     */
    @Input() buttonProps: ButtonProps = { rounded: true };
    /**
     * Template of the icon.
     * @group Templates
     */
    @ContentChild('icon') iconTemplate: TemplateRef<any> | undefined;

    private _icon: string | undefined;

    set icon(value: string | undefined) {
        this._icon = value;
    }

    documentScrollListener: VoidFunction | null | undefined;

    parentScrollListener: VoidFunction | null | undefined;

    visible: boolean = false;

    overlay: any;

    _componentStyle = inject(ScrollTopStyle);

    ngOnInit() {
        super.ngOnInit();
        if (this.target === 'window') this.bindDocumentScrollListener();
        else if (this.target === 'parent') this.bindParentScrollListener();
    }

    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'icon':
                    this.iconTemplate = item.template;
                    break;
            }
        });
    }

    onClick() {
        let scrollElement = this.target === 'window' ? this.document.defaultView : this.el.nativeElement.parentElement;
        scrollElement.scroll({
            top: 0,
            behavior: this.behavior
        });
    }

    onEnter(event: AnimationEvent) {
        switch (event.toState) {
            case 'open':
                this.overlay = event.element;
                ZIndexUtils.set('overlay', this.overlay, this.config.zIndex.overlay);
                break;
            case 'void':
                this.overlay = null;
                break;
        }
    }

    onLeave(event: AnimationEvent) {
        switch (event.toState) {
            case 'void':
                ZIndexUtils.clear(event.element);
                break;
        }
    }

    checkVisibility(scrollY: number) {
        if (scrollY > this.threshold) this.visible = true;
        else this.visible = false;

        this.cd.markForCheck();
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

    getStyleClass() {
        return `p-scrolltop p-button${this.styleClass ? ` ${this.styleClass}` : ''}${this.target !== 'window' ? ' p-scrolltop-sticky' : ''}`;
    }

    ngOnDestroy() {
        if (this.target === 'window') this.unbindDocumentScrollListener();
        else if (this.target === 'parent') this.unbindParentScrollListener();

        if (this.overlay) {
            ZIndexUtils.clear(this.overlay);
            this.overlay = null;
        }
        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [ScrollTop, SharedModule],
    exports: [ScrollTop, SharedModule]
})
export class ScrollTopModule {}
