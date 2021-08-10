import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
export class Avatar {
    constructor() {
        this.size = "normal";
        this.shape = "square";
    }
    containerClass() {
        return {
            'p-avatar p-component': true,
            'p-avatar-image': this.image != null,
            'p-avatar-circle': this.shape === 'circle',
            'p-avatar-lg': this.size === 'large',
            'p-avatar-xl': this.size === 'xlarge'
        };
    }
}
Avatar.decorators = [
    { type: Component, args: [{
                selector: 'p-avatar',
                template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <ng-content></ng-content>
            <span class="p-avatar-text" *ngIf="label; else iconTemplate">{{label}}</span>
            <ng-template #iconTemplate><span [class]="icon" [ngClass]="'p-avatar-icon'" *ngIf="icon; else imageTemplate"></span></ng-template>
            <ng-template #imageTemplate><img [src]="image" *ngIf="image"></ng-template>
        </div>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-avatar{align-items:center;display:inline-flex;font-size:1rem;height:2rem;justify-content:center;width:2rem}.p-avatar.p-avatar-image{background-color:transparent}.p-avatar.p-avatar-circle{border-radius:50%;overflow:hidden}.p-avatar .p-avatar-icon{font-size:1rem}.p-avatar img{height:100%;width:100%}"]
            },] }
];
Avatar.propDecorators = {
    label: [{ type: Input }],
    icon: [{ type: Input }],
    image: [{ type: Input }],
    size: [{ type: Input }],
    shape: [{ type: Input }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }]
};
export class AvatarModule {
}
AvatarModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [Avatar],
                declarations: [Avatar]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9hdmF0YXIvIiwic291cmNlcyI6WyJhdmF0YXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQWdCL0MsTUFBTSxPQUFPLE1BQU07SUFkbkI7UUFzQmEsU0FBSSxHQUFXLFFBQVEsQ0FBQztRQUV4QixVQUFLLEdBQVcsUUFBUSxDQUFDO0lBZXRDLENBQUM7SUFURyxjQUFjO1FBQ1YsT0FBTztZQUNILHNCQUFzQixFQUFFLElBQUk7WUFDNUIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJO1lBQ3BDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxLQUFLLEtBQUssUUFBUTtZQUMxQyxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPO1lBQ3BDLGFBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVE7U0FDeEMsQ0FBQztJQUNOLENBQUM7OztZQXRDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFFBQVEsRUFBRTs7Ozs7OztLQU9UO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFFeEM7OztvQkFHSSxLQUFLO21CQUVMLEtBQUs7b0JBRUwsS0FBSzttQkFFTCxLQUFLO29CQUVMLEtBQUs7b0JBRUwsS0FBSzt5QkFFTCxLQUFLOztBQWtCVixNQUFNLE9BQU8sWUFBWTs7O1lBTHhCLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztnQkFDakIsWUFBWSxFQUFFLENBQUMsTUFBTSxDQUFDO2FBQ3pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdFbmNhcHN1bGF0aW9uLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWF2YXRhcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJjb250YWluZXJDbGFzcygpXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWF2YXRhci10ZXh0XCIgKm5nSWY9XCJsYWJlbDsgZWxzZSBpY29uVGVtcGxhdGVcIj57e2xhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI2ljb25UZW1wbGF0ZT48c3BhbiBbY2xhc3NdPVwiaWNvblwiIFtuZ0NsYXNzXT1cIidwLWF2YXRhci1pY29uJ1wiICpuZ0lmPVwiaWNvbjsgZWxzZSBpbWFnZVRlbXBsYXRlXCI+PC9zcGFuPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI2ltYWdlVGVtcGxhdGU+PGltZyBbc3JjXT1cImltYWdlXCIgKm5nSWY9XCJpbWFnZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9hdmF0YXIuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQXZhdGFyIHtcblxuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBpY29uOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBpbWFnZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc2l6ZTogc3RyaW5nID0gXCJub3JtYWxcIjtcblxuICAgIEBJbnB1dCgpIHNoYXBlOiBzdHJpbmcgPSBcInNxdWFyZVwiO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIGNvbnRhaW5lckNsYXNzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3AtYXZhdGFyIHAtY29tcG9uZW50JzogdHJ1ZSxcbiAgICAgICAgICAgICdwLWF2YXRhci1pbWFnZSc6IHRoaXMuaW1hZ2UgIT0gbnVsbCxcbiAgICAgICAgICAgICdwLWF2YXRhci1jaXJjbGUnOiB0aGlzLnNoYXBlID09PSAnY2lyY2xlJyxcbiAgICAgICAgICAgICdwLWF2YXRhci1sZyc6IHRoaXMuc2l6ZSA9PT0gJ2xhcmdlJyxcbiAgICAgICAgICAgICdwLWF2YXRhci14bCc6IHRoaXMuc2l6ZSA9PT0gJ3hsYXJnZSdcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW0F2YXRhcl0sXG4gICAgZGVjbGFyYXRpb25zOiBbQXZhdGFyXVxufSlcbmV4cG9ydCBjbGFzcyBBdmF0YXJNb2R1bGUgeyB9XG4iXX0=