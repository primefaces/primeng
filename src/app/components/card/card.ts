import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, ElementRef, Input, NgModule, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { BlockableUI, Footer, Header, PrimeTemplate, SharedModule } from 'primeng/api';
/**
 * Card is a flexible container component.
 * @group Components
 */
@Component({
    selector: 'p-card',
    template: `
        <div [ngClass]="'p-card p-component'" [ngStyle]="style" [class]="styleClass" [attr.data-pc-name]="'card'">
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
     * @group Props
     */
    @Input() header: string | undefined;
    /**
     * Subheader of the card.
     * @group Props
     */
    @Input() subheader: string | undefined;
    /**
     * Inline style of the element.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;

    @ContentChild(Header) headerFacet: TemplateRef<any> | undefined;

    @ContentChild(Footer) footerFacet: TemplateRef<any> | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    headerTemplate: TemplateRef<any> | undefined;

    titleTemplate: TemplateRef<any> | undefined;

    subtitleTemplate: TemplateRef<any> | undefined;

    contentTemplate: TemplateRef<any> | undefined;

    footerTemplate: TemplateRef<any> | undefined;

    constructor(private el: ElementRef) {}

    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
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
