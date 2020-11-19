import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FilterMatchMode } from './filtermatchmode';
import { Translation } from './translation';

@Injectable({providedIn: 'root'})
export class PrimeNGConfig {

    ripple: boolean = false;

    filterMatchModeOptions = {
        text: [
            FilterMatchMode.STARTS_WITH,
            FilterMatchMode.CONTAINS,
            FilterMatchMode.NOT_CONTAINS,
            FilterMatchMode.ENDS_WITH,
            FilterMatchMode.EQUALS,
            FilterMatchMode.NOT_EQUALS
        ],
        numeric: [
            FilterMatchMode.EQUALS,
            FilterMatchMode.NOT_EQUALS,
            FilterMatchMode.LESS_THAN,
            FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
            FilterMatchMode.GREATER_THAN,
            FilterMatchMode.GREATER_THAN_OR_EQUAL_TO
        ],
        date: [
            FilterMatchMode.IS,
            FilterMatchMode.IS_NOT,
            FilterMatchMode.BEFORE,
            FilterMatchMode.AFTER
        ]
    };

    private translation: Translation = {
        startsWith: 'Starts with',
        contains: 'Contains',
        notContains: 'Not contains',
        endsWith: 'Ends with',
        equals: 'Equals',
        notEquals: 'Not equals',
        lt: 'Less than',
        lte: 'Less than or equal to',
        gt: 'Greater than',
        gte: 'Great then or equals',
        is: 'Is',
        isNot: 'Is not',
        before: 'Before',
        after: 'After',
        clear: 'Clear',
        apply: 'Apply',
        matchAll: 'Match All',
        matchAny: 'Match Any',
        addRule: 'Add Rule',
        removeRule: 'Remove Rule',
        accept: 'Yes',
        reject: 'No',
        choose: 'Choose',
        upload: 'Upload',
        cancel: 'Cancel',
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
        monthNames: ["January","February","March","April","May","June","July","August","September","October","November","December"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        today: 'Today',
        weekHeader: 'Wk'
    }

    private translationSource = new Subject<any>();
    
    translationObserver = this.translationSource.asObservable();
    
    getTranslation(key: string) {
        return this.translation[key];
    }

    setTranslation(value: Translation) {
        this.translation = {...this.translation, ...value};
        this.translationSource.next(this.translation);
    }
}