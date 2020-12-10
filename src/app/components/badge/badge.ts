import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, QueryList, ContentChildren, TemplateRef, Directive, OnDestroy, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { UniqueComponentId } from 'primeng/utils';

@Directive({
    selector: '[pBadge]'
})
export class BadgeDirective implements AfterViewInit, OnDestroy {

    @Input() iconPos: 'left' | 'right' | 'top' | 'bottom' = 'left';
            
    public _value: string;
            
    public initialized: boolean;

    private id: string;
    
    constructor(public el: ElementRef) {}
    
    ngAfterViewInit() {
        this.id = UniqueComponentId() + '_badge';

        let badge = document.createElement('span');
        badge.id = this.id ;
        badge.className = 'p-badge p-component';

        if (this.severity) {
            DomHandler.addClass(badge, 'p-badge-' + this.severity);
        }
        
        if (this.value != null) {
            badge.appendChild(document.createTextNode(this.value));
            
            if (String(this.value).length === 1) {
                DomHandler.addClass(badge, 'p-badge-no-gutter');
            }
        }
        else {
            DomHandler.addClass(badge, 'p-badge-dot');
        }

        DomHandler.addClass(this.el.nativeElement, 'p-overlay-badge');
        this.el.nativeElement.appendChild(badge);

        this.initialized = true;
    }

    @Input() get value(): string {
        return this._value;
    }

    set value(val: string) {
        if (val !== this._value) {
            this._value = val;

            if (this.initialized) {
                let badge = document.getElementById(this.id);

                if (this._value) {
                    if (DomHandler.hasClass(badge, 'p-badge-dot'))
                        DomHandler.removeClass(badge, 'p-badge-dot');

                    if (String(this._value).length === 1) {
                        DomHandler.addClass(badge, 'p-badge-no-gutter');
                    }
                    else {
                        DomHandler.removeClass(badge, 'p-badge-no-gutter');
                    }
                }
                else if (!this._value && !DomHandler.hasClass(badge, 'p-badge-dot')) {
                    DomHandler.addClass(badge, 'p-badge-dot');
                }

                badge.innerHTML = '';
                badge.appendChild(document.createTextNode(this._value));
            }
        }
    }

    @Input() severity: string;
        
    ngOnDestroy() {
        this.initialized = false;
    }
}

@Component({
    selector: 'p-badge',
    template: `
        <span [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <ng-container *ngIf="!contentTemplate;else content">
                {{value}}
            </ng-container>
            <ng-template #content>
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                <span [ngClass]="badgeClass()">{{value}}</span>
            </ng-template>
        </span>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./badge.css']
})
export class Badge {

    @Input() styleClass: string;

    @Input() style: any;

    @Input() size: string;
    
    @Input() severity: string;
    
    @Input() value: string;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;
    
    contentTemplate: TemplateRef<any>;

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                break;
                
                default:
                    this.contentTemplate = item.template;
                break;
            }
        });
    }
    
    containerClass() {
        return this.contentTemplate ? 'p-overlay-badge' : this.badgeClass();
    }
    
    badgeClass() {
        return {
            'p-badge p-component': true,
            'p-badge-no-gutter': this.value && String(this.value).length === 1,
            'p-badge-lg': this.size === 'large',
            'p-badge-xl': this.size === 'xlarge',
            'p-badge-info': this.severity === 'info',
            'p-badge-success': this.severity === 'success',
            'p-badge-warning': this.severity === 'warning',
            'p-badge-danger': this.severity === 'danger'
        };
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Badge, BadgeDirective, SharedModule],
    declarations: [Badge, BadgeDirective]
})
export class BadgeModule { }
