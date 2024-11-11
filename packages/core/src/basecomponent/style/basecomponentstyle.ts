import { Injectable } from '@angular/core';
import { BaseStyle } from '@primeng/core/base';

@Injectable({ providedIn: 'root' })
export class BaseComponentStyle extends BaseStyle {
    name = 'common';
}
