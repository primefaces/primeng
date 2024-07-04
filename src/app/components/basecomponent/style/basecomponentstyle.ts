import { BaseStyle } from 'primeng/base';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseComponentStyle extends BaseStyle {
    name = 'common';
}
