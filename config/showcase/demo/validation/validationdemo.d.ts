import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Message, SelectItem } from '../../../components/common/api';
export declare class ValidationDemo implements OnInit {
    private fb;
    msgs: Message[];
    userform: FormGroup;
    submitted: boolean;
    genders: SelectItem[];
    description: string;
    constructor(fb: FormBuilder);
    ngOnInit(): void;
    onSubmit(value: string): void;
    readonly diagnostic: string;
}
