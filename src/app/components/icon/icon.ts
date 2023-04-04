import { NgModule, Component, Input, ChangeDetectorRef, TemplateRef, QueryList, ContentChildren, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeTemplate, SharedModule } from 'primeng/api';

interface BaseIcon {
    spin?: boolean;
    label?: string;
}

@Component({
    selector: 'p-icon',
    template: ` <span class="p-icon">
        <i *ngIf="!iconTemplate" [ngClass]="icon" [class]="size"></i>
        <ng-template #iconContainer></ng-template>
        <ng-content></ng-content>
        <ng-container *ngTemplateOutlet="iconTemplate"></ng-container>
    </span>`,
    host: {
        class: 'p-element'
    }
})
export class Icon {
    @ViewChild('iconContainer', { read: ViewContainerRef }) iconContainer: ViewContainerRef;

    @Input() icon: string;

    @Input() set size(value) {
        this._size = `text-${value}`;
    }

    @Input() get iconTemplate(): TemplateRef<any> {
        return this._iconTemplate;
    }

    set iconTemplate(value) {
        this._iconTemplate = value;
    }

    get size() {
        return this._size;
    }

    _svgIcon: any;

    @Input() get svgIcon() {
        return this._svgIcon;
    }

    set svgIcon(value) {
        this._svgIcon = value;

        if (this._svgIcon) {
            this.loadSvg();
        }
    }

    @Input() spin: boolean = false;

    _iconTemplate;

    _size: string;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    constructor(private cd: ChangeDetectorRef) {}

    ngAfterContentInit() {
        if (!this.iconTemplate) {
            this.templates.forEach((item) => {
                switch (item.getType()) {
                    case 'icon':
                        this.iconTemplate = item.template;
                        break;
                    default:
                        this.iconTemplate = item.template;
                        break;
                }
            });
        }
    }

    loadSvg() {
        if (this.svgIcon && this.iconContainer) {
            this.iconContainer.clear();
            const icon = this.iconContainer.createComponent<BaseIcon>(this.svgIcon);
            icon.instance.spin = true;
            this.cd.detectChanges();
        }
    }
}

@NgModule({
    imports: [CommonModule, SharedModule],
    exports: [Icon, SharedModule],
    declarations: [Icon]
})
export class IconModule {}
