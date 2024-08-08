import { TemplateRef } from '@angular/core';
import { SelectItem } from 'primeng/api';

/**
 * Defines valid templates in Column Filter.
 * @group Templates
 */
export interface TableColumnFilterTemplates {
    /**
     * Custom filter template.
     */
    filter(context: {
        /**
         * filterConstraint.value.
         */
        $implicit?: string;
        /**
         * filter callback.
         */
        filterCallback?: (value: string) => void;
        /**
         * Type of the input.
         */
        type?: string;
        /**
         * Filter constraint.
         */
        filterConstraint?: string;
        /**
         * Input placeholder.
         */
        placeholder?: boolean;
        /**
         * Minimum fraction of digits.
         */
        minFractionDigits?: number;
        /**
         * Maximum fraction of digits.
         */
        maxFractionDigits?: number;
        /**
         * Input prefix.
         */
        prefix?: string;
        /**
         * Input suffix.
         */
        suffix?: string;
        /**
         * Locale.
         */
        locale?: string;
        /**
         * Locale matcher.
         */
        localeMatcher?: string;
        /**
         * Enables currency input.
         */
        currency?: boolean;
        /**
         * Display of the currency input.
         */
        currencyDisplay?: boolean;
        /**
         * Defines if filter grouping will be enabled.
         */
        useGrouping?: boolean;
        /**
         * Defines the visibility of buttons.
         */
        showButtons?: boolean;
    }): TemplateRef<any>;
    /**
     * Custom header template.
     */
    header(): TemplateRef<any>;
    /**
     * Custom footer template.
     */
    footer(): TemplateRef<any>;
    /**
     * Custom filter icon template.
     */
    filtericon(): TemplateRef<any>;
    /**
     * Custom remove rule icon template.
     */
    removeruleicon(): TemplateRef<any>;
    /**
     * Custom add rule icon template.
     */
    addruleicon(): TemplateRef<any>;
    /**
     * Custom clear filter icon template.
     */
    clearfiltericon(): TemplateRef<any>;
}

/**
 * Defines valid properties in ColumnFilter component.
 * @group Components
 */
export interface ColumnFilterProps {
    /**
     * Property represented by the column.
     * @defaultValue text
     * @group Props
     */
    field: string | undefined;
    /**
     * Type of the input.
     * @defaultValue text
     * @group Props
     */
    type: string;
    /**
     * Filter display.
     * @defaultValue row
     * @group Props
     */
    display: string;
    /**
     * Decides whether to display filter menu popup.
     * @defaultValue true
     * @group Props
     */
    showMenu: boolean;
    /**
     * Filter match mode.
     * @group Props
     */
    matchMode: string | undefined;
    /**
     * Filter operator.
     * @defaultValue 'AND'
     * @group Props
     */
    operator: string;
    /**
     * Decides whether to display filter operator.
     * @defaultValue true
     * @group Props
     */
    showOperator: boolean;
    /**
     * Decides whether to display clear filter button.
     * @defaultValue true
     * @group Props
     */
    showClearButton: boolean;
    /**
     * Decides whether to display apply filter button.
     * @defaultValue true
     * @group Props
     */
    showApplyButton: boolean;
    /**
     * Decides whether to display filter match modes.
     * @defaultValue true
     * @group Props
     */
    showMatchModes: boolean;
    /**
     * Decides whether to display add filter button.
     * @defaultValue true
     * @group Props
     */
    showAddButton: boolean;
    /**
     * Decides whether to close popup on clear button click.
     * @defaultValue true
     * @group Props
     */
    hideOnClear: boolean;
    /**
     * Filter placeholder.
     * @group Props
     */
    placeholder: string | undefined;
    /**
     * Filter match mode options.
     * @group Props
     */
    matchModeOptions: SelectItem[] | undefined;
    /**
     * Defines maximum amount of constraints.
     * @defaultValue 2
     * @group Props
     */
    maxConstraints: number;
    /**
     * Defines minimum fraction of digits.
     * @group Props
     */
    minFractionDigits: number | undefined;
    /**
     * Defines maximum fraction of digits.
     * @group Props
     */
    maxFractionDigits: number | undefined;
    /**
     * Defines prefix of the filter.
     * @group Props
     */
    prefix: string | undefined;
    /**
     * Defines suffix of the filter.
     * @group Props
     */
    suffix: string | undefined;
    /**
     * Defines filter locale.
     * @group Props
     */
    locale: string | undefined;
    /**
     * Defines filter locale matcher.
     * @group Props
     */
    localeMatcher: string | undefined;
    /**
     * Enables currency input.
     * @group Props
     */
    currency: boolean | undefined;
    /**
     * Defines the display of the currency input.
     * @group Props
     */
    currencyDisplay: string | undefined;
    /**
     * Defines if filter grouping will be enabled.
     * @defaultValue true
     * @group Props
     */
    useGrouping: boolean;
    /**
     * Defines the visibility of buttons.
     * @defaultValue true
     * @group Props
     */
    showButtons: boolean;
    /**
     * Defines the aria-label of the form element.
     * @group Props
     */
    ariaLabel: string | undefined;
}
