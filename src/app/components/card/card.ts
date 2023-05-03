import { NgModule, Component, Input, ElementRef, ContentChild, ChangeDetectionStrategy, ViewEncapsulation, TemplateRef, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, Header, Footer, PrimeTemplate } from 'primeng/api';
import { BlockableUI } from 'primeng/api';
import { CardTemplates } from './card.model';

@Component({
    selector: 'p-card',
    template: `
        <div [ngClass]="'p-card p-component'" [ngStyle]="style" [class]="styleClass">
            <div class="p-card-header" *ngIf="headerFacet || headerTemplate">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
            </div>
            <div class="p-card-body">
                <div class="p-card-title" *ngIf="header || titleTemplate">
                    {{ header }}
                    <ng-container *ngTemplateOutlet="titleTemplate"></ng-container>
                </div>
                <div class="p-card-subtitle" *ngIf="subheader || subtitleTemplate">
                    {{ subheader }}
                    <ng-container *ngTemplateOutlet="subtitleTemplate"></ng-container>
                </div>
                <div class="p-card-content">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
                <div class="p-card-footer" *ngIf="footerFacet || footerTemplate">
                    <ng-content select="p-footer"></ng-content>
                    <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                </div>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./card.css'],
    host: {
        class: 'p-element'
    }
})
export class Card implements AfterContentInit, BlockableUI {
    /**
     * Header of the card.
     */
    @Input() header: string | undefined;
    /**
     * Subheader of the card.
     */
    @Input() subheader: string | undefined;
    /**
     * Inline style of the element.
     */
    @Input() style: CSSStyleDeclaration | undefined;
    /**
     * Class of the element.
     */
    @Input() styleClass: string | undefined;

    @ContentChild(Header) headerFacet;

    @ContentChild(Footer) footerFacet;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    headerTemplate: TemplateRef<CardTemplates>;

    titleTemplate: CardTemplates;

    subtitleTemplate: CardTemplates;

    contentTemplate: CardTemplates;

    footerTemplate: CardTemplates;

    constructor(private el: ElementRef) {}

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'title':
                    this.titleTemplate = item.template;
                    break;

                case 'subtitle':
                    this.subtitleTemplate = item.template;
                    break;

                case 'content':
                    this.contentTemplate = item.template;
                    break;

                case 'footer':
                    this.footerTemplate = item.template;
                    break;

                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Card, SharedModule],
    declarations: [Card]
})
export class CardModule {}
