import { CommonModule } from '@angular/common';
import { AfterContentInit, booleanAttribute, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, EventEmitter, inject, Input, NgModule, Output, QueryList, SimpleChanges, TemplateRef, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule, TranslationKeys } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { TimesCircleIcon } from 'primeng/icons';
import { ChipProps } from './chip.interface';
import { ChipStyle } from './style/chipstyle';

/**
 * Chip represents people using icons, labels and images.
 * @group Components
 */
@Component({
    selector: 'p-chip',
    standalone: true,
    imports: [CommonModule, TimesCircleIcon, SharedModule],
    template: `
        <ng-content></ng-content>
        <img [class]="cx('image')" [src]="image" *ngIf="image; else iconTemplate" (error)="imageError($event)" [alt]="alt" />
        <ng-template #iconTemplate><span *ngIf="icon" [class]="icon" [ngClass]="cx('icon')" [attr.data-pc-section]="'icon'"></span></ng-template>
        <div [class]="cx('label')" *ngIf="label" [attr.data-pc-section]="'label'">{{ label }}</div>
        <ng-container *ngIf="removable">
            <ng-container *ngIf="!removeIconTemplate && !_removeIconTemplate">
                <span
                    tabindex="0"
                    *ngIf="removeIcon"
                    [class]="removeIcon"
                    [ngClass]="cx('removeIcon')"
                    [attr.data-pc-section]="'removeicon'"
                    (click)="close($event)"
                    (keydown)="onKeydown($event)"
                    [attr.aria-label]="removeAriaLabel"
                    role="button"
                ></span>
                <svg
                    data-p-icon="times-circle"
                    tabindex="0"
                    *ngIf="!removeIcon"
                    [class]="cx('removeIcon')"
                    [attr.data-pc-section]="'removeicon'"
                    (click)="close($event)"
                    (keydown)="onKeydown($event)"
                    [attr.aria-label]="removeAriaLabel"
                    role="button"
                />
            </ng-container>
            <span *ngIf="removeIconTemplate || _removeIconTemplate" tabindex="0" [attr.data-pc-section]="'removeicon'" [class]="cx('removeIcon')" (click)="close($event)" (keydown)="onKeydown($event)" [attr.aria-label]="removeAriaLabel" role="button">
                <ng-template *ngTemplateOutlet="removeIconTemplate || _removeIconTemplate"></ng-template>
            </span>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ChipStyle],
    host: {
        '[class]': "cn(cx('root'), styleClass)",
        '[style.display]': '!visible && "none"',
        '[attr.data-pc-name]': "'chip'",
        '[attr.aria-label]': 'label',
        '[attr.data-pc-section]': "'root'"
    }
})
export class Chip extends BaseComponent implements AfterContentInit {
    /**
     * Defines the text to display.
     * @group Props
     */
    @Input() label: string | undefined;
    /**
     * Defines the icon to display.
     * @group Props
     */
    @Input() icon: string | undefined;
    /**
     * Defines the image to display.
     * @group Props
     */
    @Input() image: string | undefined;
    /**
     * Alt attribute of the image.
     * @group Props
     */
    @Input() alt: string | undefined;
    /**
     * Class of the element.
     * @deprecated since v20.0.0, use `class` instead.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Whether to display a remove icon.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) removable: boolean | undefined = false;
    /**
     * Icon of the remove element.
     * @group Props
     */
    @Input() removeIcon: string | undefined;
    /**
     * Callback to invoke when a chip is removed.
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    @Output() onRemove: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    /**
     * This event is triggered if an error occurs while loading an image file.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onImageError: EventEmitter<Event> = new EventEmitter<Event>();

    visible: boolean = true;

    get removeAriaLabel() {
        return this.config.getTranslation(TranslationKeys.ARIA)['removeLabel'];
    }
    /**
     * Used to pass all properties of the chipProps to the Chip component.
     * @group Props
     */
    @Input() get chipProps(): ChipProps {
        return this._chipProps;
    }
    set chipProps(val: ChipProps | undefined) {
        this._chipProps = val;

        if (val && typeof val === 'object') {
            //@ts-ignore
            Object.entries(val).forEach(([k, v]) => this[`_${k}`] !== v && (this[`_${k}`] = v));
        }
    }

    _chipProps: ChipProps;

    _componentStyle = inject(ChipStyle);

    @ContentChild('removeicon', { descendants: false }) removeIconTemplate: TemplateRef<any> | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    _removeIconTemplate: TemplateRef<any> | undefined;

    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'removeicon':
                    this._removeIconTemplate = item.template;
                    break;

                default:
                    this._removeIconTemplate = item.template;
                    break;
            }
        });
    }

    ngOnChanges(simpleChanges: SimpleChanges) {
        super.ngOnChanges(simpleChanges);
        if (simpleChanges.chipProps && simpleChanges.chipProps.currentValue) {
            const { currentValue } = simpleChanges.chipProps;

            if (currentValue.label !== undefined) {
                this.label = currentValue.label;
            }
            if (currentValue.icon !== undefined) {
                this.icon = currentValue.icon;
            }
            if (currentValue.image !== undefined) {
                this.image = currentValue.image;
            }
            if (currentValue.alt !== undefined) {
                this.alt = currentValue.alt;
            }
            if (currentValue.styleClass !== undefined) {
                this.styleClass = currentValue.styleClass;
            }
            if (currentValue.removable !== undefined) {
                this.removable = currentValue.removable;
            }
            if (currentValue.removeIcon !== undefined) {
                this.removeIcon = currentValue.removeIcon;
            }
        }
    }

    close(event: MouseEvent) {
        this.visible = false;
        this.onRemove.emit(event);
    }

    onKeydown(event) {
        if (event.key === 'Enter' || event.key === 'Backspace') {
            this.close(event);
        }
    }

    imageError(event: Event) {
        this.onImageError.emit(event);
    }
}

@NgModule({
    imports: [Chip, SharedModule],
    exports: [Chip, SharedModule]
})
export class ChipModule {}
