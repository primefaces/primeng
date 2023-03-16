import { ComponentRef } from '@angular/core';

export interface Doc {
    id?: string;
    label?: string;
    component?: ComponentRef<any>;
    doc?: Doc[];
    children?: Doc[];
}
