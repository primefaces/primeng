import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, inject, Input, NgModule, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { OverlayBadgeStyle } from './style/overlaybadgestyle';
import { BaseComponent } from 'primeng/basecomponent';
import { BadgeModule } from 'primeng/badge';
/**
 * OverlayPanel is a container component positioned as connected to its target.
 * @group Components
 */
@Component({
    selector: 'p-overlayBadge',
    template: `
        <div class="p-overlaybadge">
            <ng-content></ng-content>
            <p-badge [styleClass]="styleClass" [style]="style" [badgeSize]="badgeSize" [severity]="severity" [value]="value" [badgeDisabled]="badgeDisabled" [size]="size" />
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [OverlayBadgeStyle]
})
export class OverlayBadge extends BaseComponent {
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
       * Size of the badge, valid options are "large" and "xlarge".
       * @group Props
       */
      @Input() badgeSize: 'small' | 'large' | 'xlarge' | null | undefined;
      /**
       * Severity type of the badge.
       * @group Props
       */
      @Input() severity: 'success' | 'info' | 'warning' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast' | null | undefined;
      /**
       * Value to display inside the badge.
       * @group Props
       */
      @Input() value: string | number | null | undefined;
      /**
       * When specified, disables the component.
       * @group Props
       */
      @Input({ transform: booleanAttribute }) badgeDisabled: boolean = false;
      /**
       * Size of the badge, valid options are "large" and "xlarge".
       * @group Props
       * @deprecated use badgeSize instead.
       */
      @Input() public set size(value: 'large' | 'xlarge' | 'small' | undefined | null) {
          this._size = value;
          !this.badgeSize && this.size && console.warn('size property is deprecated and will removed in v18, use badgeSize instead.');
      }
      get size() {
          return this._size;
      }
      _size: 'large' | 'xlarge' | 'small' | undefined | null;

    _componentStyle = inject(OverlayBadgeStyle);

    constructor() {
        super();
    }
}

@NgModule({
    imports: [CommonModule, SharedModule, BadgeModule],
    exports: [OverlayBadge, SharedModule, BadgeModule],
    declarations: [OverlayBadge]
})
export class OverlayBadgeModule {}
