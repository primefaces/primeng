import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
export class Divider {
    constructor() {
        this.layout = "horizontal";
        this.type = "solid";
    }
    containerClass() {
        return {
            'p-divider p-component': true,
            'p-divider-horizontal': this.layout === "horizontal",
            'p-divider-vertical': this.layout === "vertical",
            'p-divider-solid': this.type === "solid",
            'p-divider-dashed': this.type === "dashed",
            'p-divider-dotted': this.type === "dotted",
            'p-divider-left': this.layout === 'horizontal' && (!this.align || this.align === 'left'),
            'p-divider-center': (this.layout === 'horizontal' && this.align === 'center') || (this.layout === 'vertical' && (!this.align || this.align === 'center')),
            'p-divider-right': this.layout === 'horizontal' && this.align === 'right',
            'p-divider-top': this.layout === 'vertical' && (this.align === 'top'),
            'p-divider-bottom': this.layout === 'vertical' && this.align === 'bottom'
        };
    }
}
Divider.decorators = [
    { type: Component, args: [{
                selector: 'p-divider',
                template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style" role="separator">
            <div class="p-divider-content">
                <ng-content></ng-content>
            </div>
        </div>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-divider-horizontal{align-items:center;display:flex;position:relative;width:100%}.p-divider-horizontal:before{content:\"\";display:block;left:0;position:absolute;top:50%;width:100%}.p-divider-horizontal.p-divider-left{justify-content:flex-start}.p-divider-horizontal.p-divider-right{justify-content:flex-end}.p-divider-horizontal.p-divider-center{justify-content:center}.p-divider-content{z-index:1}.p-divider-vertical{display:flex;justify-content:center;margin:0 1rem;min-height:100%;position:relative}.p-divider-vertical:before{content:\"\";display:block;height:100%;left:50%;position:absolute;top:0}.p-divider-vertical.p-divider-top{align-items:flex-start}.p-divider-vertical.p-divider-center{align-items:center}.p-divider-vertical.p-divider-bottom{align-items:flex-end}.p-divider-solid.p-divider-horizontal:before{border-top-style:solid}.p-divider-solid.p-divider-vertical:before{border-left-style:solid}.p-divider-dashed.p-divider-horizontal:before{border-top-style:dashed}.p-divider-dashed.p-divider-vertical:before{border-left-style:dashed}.p-divider-dotted.p-divider-horizontal:before{border-left-style:dotted;border-top-style:dotted}"]
            },] }
];
Divider.propDecorators = {
    styleClass: [{ type: Input }],
    style: [{ type: Input }],
    layout: [{ type: Input }],
    type: [{ type: Input }],
    align: [{ type: Input }]
};
export class DividerModule {
}
DividerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Divider],
                declarations: [Divider]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGl2aWRlci5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvZGl2aWRlci8iLCJzb3VyY2VzIjpbImRpdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQWUvQyxNQUFNLE9BQU8sT0FBTztJQWJwQjtRQW1CYSxXQUFNLEdBQVcsWUFBWSxDQUFDO1FBRTlCLFNBQUksR0FBVyxPQUFPLENBQUM7SUFxQnBDLENBQUM7SUFmRyxjQUFjO1FBQ1YsT0FBTztZQUNILHVCQUF1QixFQUFFLElBQUk7WUFDN0Isc0JBQXNCLEVBQUUsSUFBSSxDQUFDLE1BQU0sS0FBSyxZQUFZO1lBQ3BELG9CQUFvQixFQUFFLElBQUksQ0FBQyxNQUFNLEtBQUssVUFBVTtZQUNoRCxpQkFBaUIsRUFBRSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU87WUFDeEMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRO1lBQzFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUTtZQUMxQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsTUFBTSxLQUFLLFlBQVksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLE1BQU0sQ0FBQztZQUN4RixrQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFVBQVUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDO1lBQ3pKLGlCQUFpQixFQUFFLElBQUksQ0FBQyxNQUFNLEtBQUssWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssT0FBTztZQUN6RSxlQUFlLEVBQUUsSUFBSSxDQUFDLE1BQU0sS0FBSyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQztZQUNyRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsTUFBTSxLQUFLLFVBQVUsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVE7U0FDNUUsQ0FBQztJQUNOLENBQUM7OztZQXpDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFFBQVEsRUFBRTs7Ozs7O0tBTVQ7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUV4Qzs7O3lCQUdJLEtBQUs7b0JBRUwsS0FBSztxQkFFTCxLQUFLO21CQUVMLEtBQUs7b0JBRUwsS0FBSzs7QUEwQlYsTUFBTSxPQUFPLGFBQWE7OztZQUx6QixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2xCLFlBQVksRUFBRSxDQUFDLE9BQU8sQ0FBQzthQUMxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBWaWV3RW5jYXBzdWxhdGlvbiwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWRpdmlkZXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwiY29udGFpbmVyQ2xhc3MoKVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIiByb2xlPVwic2VwYXJhdG9yXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1kaXZpZGVyLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL2RpdmlkZXIuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRGl2aWRlciB7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgbGF5b3V0OiBzdHJpbmcgPSBcImhvcml6b250YWxcIjtcbiAgICBcbiAgICBASW5wdXQoKSB0eXBlOiBzdHJpbmcgPSBcInNvbGlkXCI7XG5cbiAgICBASW5wdXQoKSBhbGlnbjogc3RyaW5nO1xuXG4gICAgXG5cbiAgICBjb250YWluZXJDbGFzcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdwLWRpdmlkZXIgcC1jb21wb25lbnQnOiB0cnVlLFxuICAgICAgICAgICAgJ3AtZGl2aWRlci1ob3Jpem9udGFsJzogdGhpcy5sYXlvdXQgPT09IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgICAgICAgJ3AtZGl2aWRlci12ZXJ0aWNhbCc6IHRoaXMubGF5b3V0ID09PSBcInZlcnRpY2FsXCIsXG4gICAgICAgICAgICAncC1kaXZpZGVyLXNvbGlkJzogdGhpcy50eXBlID09PSBcInNvbGlkXCIsXG4gICAgICAgICAgICAncC1kaXZpZGVyLWRhc2hlZCc6IHRoaXMudHlwZSA9PT0gXCJkYXNoZWRcIixcbiAgICAgICAgICAgICdwLWRpdmlkZXItZG90dGVkJzogdGhpcy50eXBlID09PSBcImRvdHRlZFwiLFxuICAgICAgICAgICAgJ3AtZGl2aWRlci1sZWZ0JzogdGhpcy5sYXlvdXQgPT09ICdob3Jpem9udGFsJyAmJiAoIXRoaXMuYWxpZ24gfHwgdGhpcy5hbGlnbiA9PT0gJ2xlZnQnKSxcbiAgICAgICAgICAgICdwLWRpdmlkZXItY2VudGVyJzogKHRoaXMubGF5b3V0ID09PSAnaG9yaXpvbnRhbCcgJiYgdGhpcy5hbGlnbiA9PT0gJ2NlbnRlcicpIHx8ICh0aGlzLmxheW91dCA9PT0gJ3ZlcnRpY2FsJyAmJiAoIXRoaXMuYWxpZ24gfHwgdGhpcy5hbGlnbiA9PT0gJ2NlbnRlcicpKSxcbiAgICAgICAgICAgICdwLWRpdmlkZXItcmlnaHQnOiB0aGlzLmxheW91dCA9PT0gJ2hvcml6b250YWwnICYmIHRoaXMuYWxpZ24gPT09ICdyaWdodCcsXG4gICAgICAgICAgICAncC1kaXZpZGVyLXRvcCc6IHRoaXMubGF5b3V0ID09PSAndmVydGljYWwnICYmICh0aGlzLmFsaWduID09PSAndG9wJyksXG4gICAgICAgICAgICAncC1kaXZpZGVyLWJvdHRvbSc6IHRoaXMubGF5b3V0ID09PSAndmVydGljYWwnICYmIHRoaXMuYWxpZ24gPT09ICdib3R0b20nXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtEaXZpZGVyXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtEaXZpZGVyXVxufSlcbmV4cG9ydCBjbGFzcyBEaXZpZGVyTW9kdWxlIHsgfVxuIl19