import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, NgModule, Output, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { TimesCircleIcon } from 'primeng/icons/timescircle';
/**
 * Chip represents people using icons, labels and images.
 * @group Components
 */
@Component({
    selector: 'p-chip',
    template: `
        @if (visible) {
            <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style" [attr.data-pc-name]="'chip'" [attr.aria-label]="label" [attr.data-pc-section]="'root'">
                <ng-content />
                @if (image) {
                    <img [src]="image" (error)="imageError($event)" />
                } @else if (icon) {
                    <span [class]="icon" [ngClass]="'p-chip-icon'" [attr.data-pc-section]="'icon'"></span>
                }
                @if (label) {
                    <div class="p-chip-text" [attr.data-pc-section]="'label'">{{ label }}</div>
                }
                @if (removable) {
                    @if (removeIconTemplate) {
                        <span tabindex="0" [attr.data-pc-section]="'removeicon'" class="pi-chip-remove-icon" (click)="close($event)" (keydown)="onKeydown($event)">
                            <ng-template *ngTemplateOutlet="removeIconTemplate" />
                        </span>
                    } @else {
                        @if (removeIcon) {
                            <span tabindex="0" [class]="removeIcon" [ngClass]="'pi-chip-remove-icon'" [attr.data-pc-section]="'removeicon'" (click)="close($event)" (keydown)="onKeydown($event)"></span>
                        } @else {
                            <TimesCircleIcon tabindex="0" [class]="'pi-chip-remove-icon'" [attr.data-pc-section]="'removeicon'" (click)="close($event)" (keydown)="onKeydown($event)" />
                        }
                    }
                }
            </div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./chip.css'],
    host: {
        class: 'p-element'
    }
})
export class Chip implements AfterContentInit {
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
     * Inline style of the element.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Whether to display a remove icon.
     * @group Props
     */
    @Input() removable: boolean | undefined = false;
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

    removeIconTemplate: TemplateRef<any> | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'removeicon':
                    this.removeIconTemplate = item.template;
                    break;

                default:
                    this.removeIconTemplate = item.template;
                    break;
            }
        });
    }

    containerClass() {
        return {
            'p-chip p-component': true,
            'p-chip-image': this.image != null
        };
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
    imports: [CommonModule, TimesCircleIcon, SharedModule],
    exports: [Chip, SharedModule],
    declarations: [Chip]
})
export class ChipModule {}
