import { Injectable, PLATFORM_ID, effect, inject, signal, untracked } from '@angular/core';
import { Subject } from 'rxjs';
import { FilterMatchMode } from './filtermatchmode';
import { OverlayOptions } from './overlayoptions';
import { Translation } from './translation';
import { Theme, ThemeService } from 'primeng/themes';
import { BaseStyle } from 'primeng/base';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { ObjectUtils } from 'primeng/utils';
import Aura from '@themes/aura';

@Injectable({ providedIn: 'root' })
export class PrimeNGConfig {
    ripple: boolean = false;
    public platformId: any = inject(PLATFORM_ID);
    public document: Document = inject(DOCUMENT);

    inputStyle = signal<'outlined' | 'filled'>('outlined');

    overlayOptions: OverlayOptions = {};

    csp = signal<{ nonce: string | undefined }>({ nonce: undefined });
    // @todo define type for theme
    theme = signal<any>(undefined);

    isThemeChanged: boolean = false;

    constructor() {
        // effect(
        //     () => {
        //         ThemeService.on('theme:change', (newTheme) => {
        //             this.isThemeChanged = true;
        //             // this.theme.set(newTheme);
        //             this.onThemeChange(this.theme());
        //             console.log('changed');
        //         });
        //         // untracked(() => this.theme());
        //     },
        //     { allowSignalWrites: true }
        // );
        // effect(
        //     () => {
        //         if (this.document && this.theme() && !this.isThemeChanged) {
        //             this.onThemeChange(this.theme());
        //             this.isThemeChanged = false;
        //         }
        //     },
        //     { allowSignalWrites: true }
        // );
        effect(
            () => {
                ThemeService.on('theme:change', (newTheme) => {
                    untracked(() => {
                        this.isThemeChanged = true;
                        this.theme.set(newTheme);
                        // this.onThemeChange(this.theme());
                    });
                });
            },
            { allowSignalWrites: true }
        );
        effect(() => {
            const themeValue = this.theme();
            if (this.document && themeValue) {
                if (!this.isThemeChanged) {
                    this.onThemeChange(themeValue);
                }
                this.isThemeChanged = false;
            }
        });
    }

    onThemeChange(value: any) {
        Theme.setTheme(value);
        if (this.document) {
            this.loadCommonTheme();
        }
    }

    loadCommonTheme() {
        // common
        if (!Theme.isStyleNameLoaded('common')) {
            const { primitive, semantic } = BaseStyle.getCommonTheme?.() || {};
            const styleOptions = { nonce: undefined };
            BaseStyle.load(this.document, primitive?.css, { name: 'primitive-variables', ...styleOptions });
            BaseStyle.load(this.document, semantic?.css, { name: 'semantic-variables', ...styleOptions });
            BaseStyle.loadTheme(this.document, { name: 'global-style', ...styleOptions });

            Theme.setLoadedStyleName('common');
        }
    }

    filterMatchModeOptions = {
        text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
        numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
        date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
    };

    public translation: Translation = {
        startsWith: 'Starts with',
        contains: 'Contains',
        notContains: 'Not contains',
        endsWith: 'Ends with',
        equals: 'Equals',
        notEquals: 'Not equals',
        noFilter: 'No Filter',
        lt: 'Less than',
        lte: 'Less than or equal to',
        gt: 'Greater than',
        gte: 'Greater than or equal to',
        is: 'Is',
        isNot: 'Is not',
        before: 'Before',
        after: 'After',
        dateIs: 'Date is',
        dateIsNot: 'Date is not',
        dateBefore: 'Date is before',
        dateAfter: 'Date is after',
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
        pending: 'Pending',
        fileSizeTypes: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        chooseYear: 'Choose Year',
        chooseMonth: 'Choose Month',
        chooseDate: 'Choose Date',
        prevDecade: 'Previous Decade',
        nextDecade: 'Next Decade',
        prevYear: 'Previous Year',
        nextYear: 'Next Year',
        prevMonth: 'Previous Month',
        nextMonth: 'Next Month',
        prevHour: 'Previous Hour',
        nextHour: 'Next Hour',
        prevMinute: 'Previous Minute',
        nextMinute: 'Next Minute',
        prevSecond: 'Previous Second',
        nextSecond: 'Next Second',
        am: 'am',
        pm: 'pm',
        dateFormat: 'mm/dd/yy',
        firstDayOfWeek: 0,
        today: 'Today',
        weekHeader: 'Wk',
        weak: 'Weak',
        medium: 'Medium',
        strong: 'Strong',
        passwordPrompt: 'Enter a password',
        emptyMessage: 'No results found',
        searchMessage: '{0} results are available',
        selectionMessage: '{0} items selected',
        emptySelectionMessage: 'No selected item',
        emptySearchMessage: 'No results found',
        emptyFilterMessage: 'No results found',
        aria: {
            trueLabel: 'True',
            falseLabel: 'False',
            nullLabel: 'Not Selected',
            star: '1 star',
            stars: '{star} stars',
            selectAll: 'All items selected',
            unselectAll: 'All items unselected',
            close: 'Close',
            previous: 'Previous',
            next: 'Next',
            navigation: 'Navigation',
            scrollTop: 'Scroll Top',
            moveTop: 'Move Top',
            moveUp: 'Move Up',
            moveDown: 'Move Down',
            moveBottom: 'Move Bottom',
            moveToTarget: 'Move to Target',
            moveToSource: 'Move to Source',
            moveAllToTarget: 'Move All to Target',
            moveAllToSource: 'Move All to Source',
            pageLabel: '{page}',
            firstPageLabel: 'First Page',
            lastPageLabel: 'Last Page',
            nextPageLabel: 'Next Page',
            prevPageLabel: 'Previous Page',
            rowsPerPageLabel: 'Rows per page',
            previousPageLabel: 'Previous Page',
            jumpToPageDropdownLabel: 'Jump to Page Dropdown',
            jumpToPageInputLabel: 'Jump to Page Input',
            selectRow: 'Row Selected',
            unselectRow: 'Row Unselected',
            expandRow: 'Row Expanded',
            collapseRow: 'Row Collapsed',
            showFilterMenu: 'Show Filter Menu',
            hideFilterMenu: 'Hide Filter Menu',
            filterOperator: 'Filter Operator',
            filterConstraint: 'Filter Constraint',
            editRow: 'Row Edit',
            saveEdit: 'Save Edit',
            cancelEdit: 'Cancel Edit',
            listView: 'List View',
            gridView: 'Grid View',
            slide: 'Slide',
            slideNumber: '{slideNumber}',
            zoomImage: 'Zoom Image',
            zoomIn: 'Zoom In',
            zoomOut: 'Zoom Out',
            rotateRight: 'Rotate Right',
            rotateLeft: 'Rotate Left',
            listLabel: 'Option List',
            selectColor: 'Select a color',
            removeLabel: 'Remove',
            browseFiles: 'Browse Files',
            maximizeLabel: 'Maximize'
        }
    };

    zIndex: any = {
        modal: 1100,
        overlay: 1000,
        menu: 1000,
        tooltip: 1100
    };

    private translationSource = new Subject<any>();

    translationObserver = this.translationSource.asObservable();

    getTranslation(key: string): any {
        return this.translation[key as keyof typeof this.translation];
    }

    setTranslation(value: Translation) {
        this.translation = { ...this.translation, ...value };
        this.translationSource.next(this.translation);
    }
}
