import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'p-avatarGroup',
    template: `
        <div [ngClass]="'p-avatar-group p-component'" [class]="styleClass">
            <ng-content></ng-content>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./avatargroup.css']
})
export class AvatarGroup {

    @Input() styleClass: string;
    
}

@NgModule({
    imports: [CommonModule],
    exports: [AvatarGroup],
    declarations: [AvatarGroup]
})
export class AvatarGroupModule { }
