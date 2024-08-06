import { Injectable } from '@angular/core';
import { DialogStyle } from 'primeng/dialog';

@Injectable()
export class DynamicDialogStyle extends DialogStyle {
    name = 'dialog';
}
