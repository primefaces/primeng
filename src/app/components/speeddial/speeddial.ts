import { NgModule, Component, Input, ElementRef, ChangeDetectionStrategy, ViewEncapsulation, TemplateRef, AfterContentInit, ContentChildren, QueryList, Output, EventEmitter, ChangeDetectorRef, ViewChild, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, PrimeTemplate, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { DomHandler } from 'primeng/dom';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'p-speedDial',
    template: `
        <div #container [attr.id]="id" [ngClass]="containerClass()" [class]="className" [ngStyle]="style">
            <button pRipple pButton [style]="buttonStyle" [icon]="buttonIconClass" [ngClass]="buttonClass()" (click)="onButtonClick($event)">
                <ng-container *ngIf="buttonTemplate">
                    <ng-container *ngTemplateOutlet="buttonTemplate"></ng-container>
                </ng-container>
            </button>
            <ul #list class="p-speeddial-list" role="menu">
                <li *ngFor="let item of model; let i = index" [ngStyle]="getItemStyle(i)" class="p-speeddial-item" pTooltip [tooltipOptions]="item.tooltipOptions" [ngClass]="{'p-hidden': item.visible === false}">
                    <a *ngIf="isClickableRouterLink(item); else elseBlock" pRipple [routerLink]="item.routerLink" [queryParams]="item.queryParams" class="p-speeddial-action" [ngClass]="{'p-disabled':item.disabled}"  role="menuitem" [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" (click)="onItemClick($event, item)" (keydown.enter)="onItemClick($event, item, i)"
                        [attr.target]="item.target" [attr.id]="item.id" [attr.tabindex]="item.disabled || readonly ? null : (item.tabindex ? item.tabindex : '0')"
                        [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state">
                            <span class="p-speeddial-action-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
                    </a>
                    <ng-template #elseBlock>
                        <a [attr.href]="item.url||null" class="p-speeddial-action" role="menuitem" pRipple (click)="onItemClick($event, item)" [ngClass]="{'p-disabled':item.disabled}"
                            (keydown.enter)="onItemClick($event, item, i)" [attr.target]="item.target" [attr.id]="item.id" [attr.tabindex]="item.disabled||(i !== activeIndex && readonly) ? null : (item.tabindex ? item.tabindex : '0')">
                            <span class="p-speeddial-action-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
                        </a>
                    </ng-template>
                </li>
            </ul>
        </div>
        <div *ngIf="mask && visible" [ngClass]="{'p-speeddial-mask': true, 'p-speeddial-mask-visible': visible}" [class]="maskClassName" [ngStyle]="maskStyle"></div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./speeddial.css'],
    host: {
        'class': 'p-element'
    }
})
export class SpeedDial implements AfterViewInit, AfterContentInit, OnDestroy {

    @Input() id: string;

    @Input() model: any[] = null;

    @Input() get visible(): any {
        return this._visible;
    }
    set visible(value:any) {
        this._visible = value;

        if (this._visible) {
            this.bindDocumentClickListener();
        }
        else {
            this.unbindDocumentClickListener();
        }
    }

    @Input() style: any;

    @Input() className: string;

    @Input() direction: string =  'up'

    @Input() transitionDelay: number = 30;

    @Input() type: string =  'linear'

    @Input() radius: number = 0;

    @Input() mask: boolean = false;

    @Input() disabled: boolean = false;

    @Input() hideOnClickOutside: boolean = true;

    @Input() buttonStyle: any;

    @Input() buttonClassName: string;

    @Input() maskStyle: any;

    @Input() maskClassName: string;

    @Input() showIcon: string = 'pi pi-plus';

    @Input() hideIcon: string;

    @Input() rotateAnimation: boolean = true;

    @Output() onVisibleChange: EventEmitter<any> = new EventEmitter();

    @Output() visibleChange: EventEmitter<any> = new EventEmitter();

    @Output() onClick: EventEmitter<any> = new EventEmitter();

    @Output() onShow: EventEmitter<any> = new EventEmitter();

    @Output() onHide: EventEmitter<any> = new EventEmitter();

    @ViewChild('container') container: ElementRef;

    @ViewChild('list') list: ElementRef;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    buttonTemplate: TemplateRef<any>;

    isItemClicked: boolean = false;

    _visible: boolean = false;

    documentClickListener: any;

    constructor(private el: ElementRef, public cd: ChangeDetectorRef) { }

    ngAfterViewInit() {
        if (this.type !== 'linear') {
            const button = DomHandler.findSingle(this.container.nativeElement, '.p-speeddial-button');
            const firstItem = DomHandler.findSingle(this.list.nativeElement, '.p-speeddial-item');

            if (button && firstItem) {
                const wDiff = Math.abs(button.offsetWidth - firstItem.offsetWidth);
                const hDiff = Math.abs(button.offsetHeight - firstItem.offsetHeight);
                this.list.nativeElement.style.setProperty('--item-diff-x', `${wDiff / 2}px`);
                this.list.nativeElement.style.setProperty('--item-diff-y', `${hDiff / 2}px`);
            }
        }
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'button':
                    this.buttonTemplate = item.template;
                break;
            }
        });
    }

    show() {
        this.onVisibleChange.emit(true);
        this.visibleChange.emit(true);
        this._visible = true;
        this.onShow.emit();
        this.bindDocumentClickListener();
        this.cd.markForCheck();
    }

    hide() {
        this.onVisibleChange.emit(false);
        this.visibleChange.emit(false);
        this._visible = false;
        this.onHide.emit();
        this.unbindDocumentClickListener();
        this.cd.markForCheck();
    }

    onButtonClick(event) {
        this.visible ? this.hide() : this.show();
        this.onClick.emit(event)
        this.isItemClicked = true;
    }

    onItemClick(e, item) {
        if (item.command) {
            item.command({ originalEvent: e, item });
        }

        this.hide();

        this.isItemClicked = true;
    }


    calculatePointStyle(index) {
        const type = this.type;

        if (type !== 'linear') {
            const length = this.model.length;
            const radius = this.radius || (length * 20);

            if (type === 'circle') {
                const step = 2 * Math.PI / length;

                return {
                    left: `calc(${radius * Math.cos(step * index)}px + var(--item-diff-x, 0px))`,
                    top: `calc(${radius * Math.sin(step * index)}px + var(--item-diff-y, 0px))`,
                }
            }
            else if (type === 'semi-circle') {
                const direction = this.direction;
                const step = Math.PI / (length - 1);
                const x = `calc(${radius * Math.cos(step * index)}px + var(--item-diff-x, 0px))`;
                const y = `calc(${radius * Math.sin(step * index)}px + var(--item-diff-y, 0px))`;
                if (direction === 'up') {
                    return { left: x, bottom: y };
                }
                else if (direction === 'down') {
                    return { left: x, top: y };
                }
                else if (direction === 'left') {
                    return { right: y, top: x };
                }
                else if (direction === 'right') {
                    return { left: y, top: x };
                }
            }
            else if (type === 'quarter-circle') {
                const direction = this.direction;
                const step = Math.PI / (2 * (length - 1));
                const x = `calc(${radius * Math.cos(step * index)}px + var(--item-diff-x, 0px))`;
                const y = `calc(${radius * Math.sin(step * index)}px + var(--item-diff-y, 0px))`;
                if (direction === 'up-left') {
                    return { right: x, bottom: y };
                }
                else if (direction === 'up-right') {
                    return { left: x, bottom: y };
                }
                else if (direction === 'down-left') {
                    return { right: y, top: x };
                }
                else if (direction === 'down-right') {
                    return { left: y, top: x };
                }
            }
        }

        return {};
    }

    calculateTransitionDelay(index) {
        const length = this.model.length;

        return (this.visible ? index : length - index - 1) * this.transitionDelay;
    }

    containerClass() {
        return {
            ['p-speeddial p-component' + ` p-speeddial-${this.type}`]: true,
            [`p-speeddial-direction-${this.direction}`]: this.type !== 'circle',
            'p-speeddial-opened': this.visible,
            'p-disabled': this.disabled
        };
    }

    buttonClass() {
        return {
            'p-speeddial-button p-button-rounded': true,
            'p-speeddial-rotate': this.rotateAnimation && !this.hideIcon,
            [this.buttonClassName]: true
        };
    }

    get buttonIconClass() {
        return ((!this.visible && this.showIcon) || !this.hideIcon) ? this.showIcon : this.hideIcon;
    }

    getItemStyle(index) {
        const transitionDelay = this.calculateTransitionDelay(index);
        const pointStyle = this.calculatePointStyle(index);
        return {
            transitionDelay: `${transitionDelay}ms`,
            ...pointStyle
        };
    }

    isClickableRouterLink(item: MenuItem) {
        return item.routerLink && !this.disabled && !item.disabled;
    }

    isOutsideClicked(event) {
        return this.container && !(this.container.nativeElement.isSameNode(event.target) || this.container.nativeElement.contains(event.target) || this.isItemClicked);
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener && this.hideOnClickOutside) {
            this.documentClickListener = (event) => {
                if (this.visible && this.isOutsideClicked(event)) {
                    this.hide();
                }

                this.isItemClicked = false;
            };
            document.addEventListener('click', this.documentClickListener);
        }
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            document.removeEventListener('click', this.documentClickListener);
            this.documentClickListener = null;
        }
    }

    ngOnDestroy() {
        this.unbindDocumentClickListener();
    }
}

@NgModule({
    imports: [CommonModule, ButtonModule, RippleModule, TooltipModule, RouterModule],
    exports: [SpeedDial, SharedModule, ButtonModule, TooltipModule, RouterModule],
    declarations: [SpeedDial]
})
export class SpeedDialModule { }
