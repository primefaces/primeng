import {Injectable} from '@angular/core';
import { FilterMatchMode } from './filtermatchmode';

@Injectable({providedIn: 'root'})
export class PrimeNGConfig {

    ripple: boolean = false;

    filteMatchModes = {
        text: [
            {label: 'Starts with', value: FilterMatchMode.STARTS_WITH},
            {label: 'Contains', value: FilterMatchMode.CONTAINS},
            {label: 'Ends with', value: FilterMatchMode.ENDS_WITH},
            {label: 'Equal to', value: FilterMatchMode.EQUALS},
            {label: 'Not equal to', value: FilterMatchMode.NOT_EQUALS}
        ],
        numeric: [
            {label: 'Equal to', value: FilterMatchMode.EQUALS},
            {label: 'Not equal to', value: FilterMatchMode.NOT_EQUALS},
            {label: 'Less than', value: FilterMatchMode.LESS_THAN},
            {label: 'Less than or equal to', value: FilterMatchMode.LESS_THAN_OR_EQUAL_TO},
            {label: 'Greater than', value: FilterMatchMode.GREATER_THAN},
            {label: 'Greater than or equal to', value: FilterMatchMode.GREATER_THAN_OR_EQUAL_TOTE}
        ],
        date: [
            {label: 'Equal to', value: FilterMatchMode.EQUALS},
            {label: 'Not equal to', value: FilterMatchMode.NOT_EQUALS},
            {label: 'Less than', value: FilterMatchMode.LESS_THAN},
            {label: 'Less than or equal to', value: FilterMatchMode.LESS_THAN_OR_EQUAL_TO},
            {label: 'Greater than', value: FilterMatchMode.GREATER_THAN},
            {label: 'Greater than or equal to', value: FilterMatchMode.GREATER_THAN_OR_EQUAL_TOTE}
        ]
    };
}