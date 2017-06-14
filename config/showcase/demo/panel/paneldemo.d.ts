import { OnInit } from '@angular/core';
import { Message } from '../../../components/common/api';
import { MenuItem } from '../../../components/common/api';
export declare class PanelDemo implements OnInit {
    msgs: Message[];
    items: MenuItem[];
    ngOnInit(): void;
    save(): void;
    update(): void;
    delete(): void;
}
