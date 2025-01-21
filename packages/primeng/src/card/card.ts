import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, inject, Input, NgModule, QueryList, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { equals } from '@primeuix/utils';
import { BlockableUI, Footer, Header, PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { CardStyle } from './style/cardstyle';

/**
 * Card is a flexible container component.
 * @group Components
 */
@Component({
    selector: 'p-card',
    standalone: true,
    imports: [CommonModule, SharedModule],
    template: `
        <div [ngClass]="'p-card p-component'" [ngStyle]="_style()" [class]="styleClass" [attr.data-pc-name]="'card'">
            <div class="p-card-header" *ngIf="headerFacet || headerTemplate || _headerTemplate">
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate || _headerTemplate"></ng-container>
            </div>
            <div class="p-card-body">
                <div class="p-card-title" *ngIf="header || titleTemplate || _titleTemplate">
                    <ng-container *ngIf="header && !_titleTemplate && !titleTemplate">{{ header }}</ng-container>
                    <ng-container *ngTemplateOutlet="titleTemplate || _titleTemplate"></ng-container>
                </div>
                <div class="p-card-subtitle" *ngIf="subheader || subtitleTemplate || _subtitleTemplate">
                    <ng-container *ngIf="subheader && !_subtitleTemplate && !subtitleTemplate">{{ subheader }}</ng-container>
                    <ng-container *ngTemplateOutlet="subtitleTemplate || _subtitleTemplate"></ng-container>
                </div>
                <div class="p-card-content">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate"></ng-container>
                </div>
                <div class="p-card-footer" *ngIf="footerFacet || footerTemplate || _footerTemplate">
                    <ng-content select="p-footer"></ng-content>
                    <ng-container *ngTemplateOutlet="footerTemplate || _footerTemplate"></ng-container>
                </div>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [CardStyle]
})
export class Card extends BaseComponent implements AfterContentInit, BlockableUI {
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
    @Input() set style(value: { [klass: string]: any } | null | undefined) {
        if (!equals(this._style(), value)) {
            this._style.set(value);
        }
    }
    /**
     * Class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;

    @ContentChild(Header) headerFacet: TemplateRef<any> | undefined;

    @ContentChild(Footer) footerFacet: TemplateRef<any> | undefined;

    @ContentChild('header', { descendants: false }) headerTemplate: TemplateRef<any> | undefined;

    @ContentChild('title', { descendants: false }) titleTemplate: TemplateRef<any> | undefined;

    @ContentChild('subtitle', { descendants: false }) subtitleTemplate: TemplateRef<any> | undefined;

    @ContentChild('content', { descendants: false }) contentTemplate: TemplateRef<any> | undefined;

    @ContentChild('footer', { descendants: false }) footerTemplate: TemplateRef<any> | undefined;

    _headerTemplate: TemplateRef<any> | undefined;

    _titleTemplate: TemplateRef<any> | undefined;

    _subtitleTemplate: TemplateRef<any> | undefined;

    _contentTemplate: TemplateRef<any> | undefined;

    _footerTemplate: TemplateRef<any> | undefined;

    _style = signal<{ [klass: string]: any } | null | undefined>(null);

    _componentStyle = inject(CardStyle);

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this._headerTemplate = item.template;
                    break;

                case 'title':
                    this._titleTemplate = item.template;
                    break;

                case 'subtitle':
                    this._subtitleTemplate = item.template;
                    break;

                case 'content':
                    this._contentTemplate = item.template;
                    break;

                case 'footer':
                    this._footerTemplate = item.template;
                    break;

                default:
                    this._contentTemplate = item.template;
                    break;
            }
        });
    }
}

@NgModule({
    imports: [Card, SharedModule],
    exports: [Card, SharedModule]
})
export class CardModule {}
