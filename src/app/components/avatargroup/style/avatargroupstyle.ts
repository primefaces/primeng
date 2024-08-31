import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: 'p-avatar-group p-component',
};

@Injectable()
export class AvatarGroupStyle extends BaseStyle {
    name = 'avatargroup';

    classes = classes;
}
