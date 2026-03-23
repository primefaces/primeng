import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChild, effect, ElementRef, inject, input, model, NgModule, output, TemplateRef, viewChild, ViewEncapsulation, booleanAttribute } from '@angular/core';
import { resolveFieldData, uuid } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { Listbox, ListboxModule } from 'primeng/listbox';
import type {
    CommandMenuPassThrough,
    CommandMenuItemSelectEvent,
    CommandMenuSearchChangeEvent,
    CommandMenuItemTemplateContext,
    CommandMenuGroupTemplateContext,
    CommandMenuHeaderTemplateContext,
    CommandMenuFooterTemplateContext,
    CommandMenuEmptyTemplateContext
} from 'primeng/types/commandmenu';
import { CommandMenuStyle } from './style/commandmenustyle';

export const defaultFilter = (value: string, search: string, keywords?: string[]): number => {
    const extendValue = (value ?? '') + ' ' + (keywords?.join(' ') ?? '');

    if (extendValue.toLowerCase().includes(search.toLowerCase())) return 1;

    return 0;
};

/**
 * CommandMenu is a search-driven command palette component.
 * @group Components
 */
@Component({
    selector: 'p-commandmenu, p-command-menu',
    standalone: true,
    imports: [NgTemplateOutlet, ListboxModule, SharedModule, BindModule],
    template: `
        <div [class]="cx('header')" [pBind]="ptm('header')">
            @if (headerTemplate()) {
                <ng-container *ngTemplateOutlet="headerTemplate(); context: { $implicit: search() }"></ng-container>
            }
            <input
                #searchInput
                type="text"
                role="combobox"
                [class]="cx('input')"
                [value]="search()"
                [placeholder]="placeholder()"
                [attr.aria-label]="ariaLabel()"
                [attr.aria-expanded]="true"
                [attr.aria-controls]="listId()"
                [attr.aria-activedescendant]="focusedOptionId()"
                autocomplete="off"
                autocorrect="off"
                spellcheck="false"
                (input)="onSearchInput($event)"
                (keydown)="onInputKeyDown($event)"
                [pBind]="ptm('input')"
            />
        </div>

        <p-listbox
            #listbox
            [options]="listboxOptions()"
            [group]="isGrouped()"
            [optionLabel]="optionLabel()"
            [optionDisabled]="optionDisabled()"
            [optionGroupLabel]="optionGroupLabel()"
            [optionGroupChildren]="optionGroupChildren()"
            [focusOnHover]="selectOnHover()"
            [highlightOnSelect]="false"
            scrollHeight="none"
            [tabindex]="-1"
            (onClick)="onListboxClick($event)"
            [pt]="ptm('pcListbox')"
            [unstyled]="unstyled()"
        >
            <ng-template #item let-option let-index="index">
                @if (itemTemplate()) {
                    <ng-container *ngTemplateOutlet="itemTemplate(); context: { $implicit: option, index }"></ng-container>
                } @else {
                    {{ getOptionLabel(option) }}
                }
            </ng-template>
            <ng-template #group let-optionGroup>
                @if (groupTemplate()) {
                    <ng-container *ngTemplateOutlet="groupTemplate(); context: { $implicit: optionGroup }"></ng-container>
                } @else {
                    {{ getOptionGroupLabel(optionGroup) }}
                }
            </ng-template>
            <ng-template #empty>
                <div [class]="cx('empty')" [pBind]="ptm('empty')">
                    @if (emptyTemplate()) {
                        <ng-container *ngTemplateOutlet="emptyTemplate(); context: { $implicit: search() }"></ng-container>
                    } @else {
                        {{ emptyMessage() }}
                    }
                </div>
            </ng-template>
            <ng-template #footer>
                @if (footerTemplate()) {
                    <div [class]="cx('footer')" [pBind]="ptm('footer')">
                        <ng-container *ngTemplateOutlet="footerTemplate(); context: { $implicit: search() }"></ng-container>
                    </div>
                }
            </ng-template>
        </p-listbox>
    `,
    providers: [CommandMenuStyle, { provide: PARENT_INSTANCE, useExisting: CommandMenu }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[attr.id]': '$id()',
        '[class]': "cx('root')",
        '(keydown)': 'onHostKeyDown($event)'
    },
    hostDirectives: [Bind]
})
export class CommandMenu extends BaseComponent<CommandMenuPassThrough> {
    componentName = 'CommandMenu';

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked() {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    /**
     * An array of objects to display.
     * @group Props
     */
    options = input<any[]>();

    /**
     * Name of the label field of an option.
     * @group Props
     */
    optionLabel = input<string>();

    /**
     * Name of the value field of an option.
     * @group Props
     */
    optionValue = input<string>();

    /**
     * Name of the disabled field of an option or function to determine disabled state.
     * @group Props
     */
    optionDisabled = input<string | ((item: any) => boolean)>();

    /**
     * Name of the label field of an option group.
     * @group Props
     * @defaultValue 'label'
     */
    optionGroupLabel = input<string>('label');

    /**
     * Name of the options field of an option group.
     * @group Props
     * @defaultValue 'items'
     */
    optionGroupChildren = input<string>('items');

    /**
     * Name of the keywords field of an option used for searching.
     * @group Props
     */
    optionKeywords = input<string>();

    /**
     * Two-way bound search value.
     * @group Props
     */
    search = model<string>('');

    /**
     * Whether to highlight option on hover.
     * @group Props
     * @defaultValue true
     */
    selectOnHover = input(true, { transform: booleanAttribute });

    /**
     * Whether keyboard navigation should loop from end to start.
     * @group Props
     * @defaultValue false
     */
    loop = input(false, { transform: booleanAttribute });

    /**
     * Whether to display options as grouped.
     * @group Props
     */
    group = input(undefined, { transform: booleanAttribute });

    /**
     * Text to display when there are no results.
     * @group Props
     * @defaultValue 'No results found.'
     */
    emptyMessage = input<string>('No results found.');

    /**
     * Custom filter function. Receives (label, search, keywords?) and returns a number (0 = no match).
     * @group Props
     */
    filter = input<(label: string, search: string, keywords?: string[]) => number>();

    /**
     * Placeholder text for the search input.
     * @group Props
     */
    placeholder = input<string>();

    /**
     * Defines a string that labels the input for accessibility.
     * @group Props
     */
    ariaLabel = input<string>();

    /**
     * Callback to invoke when an item is selected.
     * @param {CommandMenuItemSelectEvent} event - Custom item select event.
     * @group Emits
     */
    onItemSelect = output<CommandMenuItemSelectEvent>();

    /**
     * Callback to invoke when the search value changes.
     * @param {CommandMenuSearchChangeEvent} event - Custom search change event.
     * @group Emits
     */
    onSearchChange = output<CommandMenuSearchChangeEvent>();

    /**
     * Custom item template.
     * @param {CommandMenuItemTemplateContext} context - item context.
     * @group Templates
     */
    itemTemplate = contentChild<TemplateRef<CommandMenuItemTemplateContext>>('item', { descendants: false });

    /**
     * Custom group template.
     * @param {CommandMenuGroupTemplateContext} context - group context.
     * @group Templates
     */
    groupTemplate = contentChild<TemplateRef<CommandMenuGroupTemplateContext>>('group', { descendants: false });

    /**
     * Custom header template.
     * @param {CommandMenuHeaderTemplateContext} context - header context.
     * @group Templates
     */
    headerTemplate = contentChild<TemplateRef<CommandMenuHeaderTemplateContext>>('header', { descendants: false });

    /**
     * Custom footer template.
     * @param {CommandMenuFooterTemplateContext} context - footer context.
     * @group Templates
     */
    footerTemplate = contentChild<TemplateRef<CommandMenuFooterTemplateContext>>('footer', { descendants: false });

    /**
     * Custom empty template.
     * @param {CommandMenuEmptyTemplateContext} context - empty context.
     * @group Templates
     */
    emptyTemplate = contentChild<TemplateRef<CommandMenuEmptyTemplateContext>>('empty', { descendants: false });

    listboxViewChild = viewChild<Listbox>('listbox');

    searchInputViewChild = viewChild<ElementRef>('searchInput');

    _componentStyle = inject(CommandMenuStyle);

    private _internalId = uuid('pn_id_');

    $id = computed(() => this._internalId);

    listId = computed(() => `${this.$id()}_list`);

    /**
     * Alias for group() to avoid template variable name collision with Listbox's #group template ref.
     */
    isGrouped = computed(() => this.group());

    focusedOptionId = computed(() => {
        const listbox = this.listboxViewChild();
        if (listbox && listbox.focusedOptionIndex() !== -1) {
            return `${listbox.$id()}_${listbox.focusedOptionIndex()}`;
        }
        return null;
    });

    /**
     * Flat options pipeline: extracts all leaf items from grouped or flat options.
     */
    flatOptions = computed(() => {
        const opts = this.options() || [];
        if (!this.group()) return opts;

        const groupChildren = this.optionGroupChildren();
        return opts.reduce((result: any[], group: any) => {
            const children = groupChildren ? resolveFieldData(group, groupChildren) : group.items;
            if (children) {
                result.push(...children);
            }
            return result;
        }, []);
    });

    /**
     * Filtered options: applies score-based filter with sorting by relevance.
     */
    filteredOptions = computed(() => {
        const searchVal = (this.search() ?? '').trim();
        const opts = this.options() || [];

        if (!searchVal) return opts;

        const filterFn = this.filter() ?? defaultFilter;
        const isGrouped = !!this.group();

        if (isGrouped) {
            const groupChildren = this.optionGroupChildren();

            return opts
                .map((group: any) => {
                    const children = (groupChildren ? resolveFieldData(group, groupChildren) : group.items) ?? [];
                    const scored = children
                        .map((item: any) => ({
                            item,
                            score: filterFn(this.getOptionLabel(item), searchVal, this.getOptionKeywords(item))
                        }))
                        .filter(({ score }: any) => score > 0)
                        .sort((a: any, b: any) => b.score - a.score);

                    if (scored.length === 0) return null;

                    return {
                        ...group,
                        [groupChildren]: scored.map((s: any) => s.item),
                        __maxScore: Math.max(...scored.map((s: any) => s.score))
                    };
                })
                .filter(Boolean)
                .sort((a: any, b: any) => (b.__maxScore ?? 0) - (a.__maxScore ?? 0));
        } else {
            return opts
                .map((item: any) => ({
                    item,
                    score: filterFn(this.getOptionLabel(item), searchVal, this.getOptionKeywords(item))
                }))
                .filter(({ score }: any) => score > 0)
                .sort((a: any, b: any) => b.score - a.score)
                .map(({ item }: any) => item);
        }
    });

    /**
     * Options passed to the internal Listbox. Same as filteredOptions.
     */
    listboxOptions = computed(() => this.filteredOptions());

    constructor() {
        super();

        // Auto-focus first item when filtered options change
        effect(() => {
            const opts = this.listboxOptions();
            const listbox = this.listboxViewChild();
            if (listbox && opts) {
                // Reset to first valid option
                const firstIndex = listbox.findFirstOptionIndex();
                listbox.focusedOptionIndex.set(firstIndex);
                listbox.focused = true;
            }
        });
    }

    getOptionLabel(option: any): string {
        const label = this.optionLabel();
        return label ? resolveFieldData(option, label) : option?.label != undefined ? option.label : String(option);
    }

    getOptionValue(option: any): any {
        const value = this.optionValue();
        return value ? resolveFieldData(option, value) : !this.optionLabel() && option?.value !== undefined ? option.value : option;
    }

    getOptionGroupLabel(optionGroup: any): string {
        const label = this.optionGroupLabel();
        return label ? resolveFieldData(optionGroup, label) : optionGroup?.label !== undefined ? optionGroup.label : optionGroup;
    }

    getOptionKeywords(option: any): string[] | undefined {
        const keywords = this.optionKeywords();
        if (keywords) {
            return resolveFieldData(option, keywords);
        }
        return undefined;
    }

    onSearchInput(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        this.search.set(value);
        this.onSearchChange.emit({ originalEvent: event, query: value });
    }

    onInputKeyDown(event: KeyboardEvent) {
        if (event.isComposing) return;

        const listbox = this.listboxViewChild();
        if (!listbox) return;

        switch (event.key) {
            case 'ArrowDown': {
                event.preventDefault();
                const current = listbox.focusedOptionIndex();
                const nextIndex = current !== -1 ? this.findNextValidIndex(current) : listbox.findFirstOptionIndex();
                listbox.changeFocusedOptionIndex(event, nextIndex);
                break;
            }

            case 'ArrowUp': {
                event.preventDefault();
                const current = listbox.focusedOptionIndex();
                const prevIndex = current !== -1 ? this.findPrevValidIndex(current) : listbox.findFirstOptionIndex();
                listbox.changeFocusedOptionIndex(event, prevIndex);
                break;
            }

            case 'Home': {
                event.preventDefault();
                const firstIndex = listbox.findFirstOptionIndex();
                if (firstIndex >= 0) {
                    listbox.changeFocusedOptionIndex(event, firstIndex);
                }
                break;
            }

            case 'End': {
                event.preventDefault();
                const lastIndex = listbox.findLastOptionIndex();
                if (lastIndex >= 0) {
                    listbox.changeFocusedOptionIndex(event, lastIndex);
                }
                break;
            }

            case 'Enter': {
                event.preventDefault();
                const currentIndex = listbox.focusedOptionIndex();
                if (currentIndex >= 0) {
                    const option = listbox.visibleOptions()[currentIndex];
                    if (option && listbox.isValidOption(option)) {
                        this.onItemSelect.emit({
                            originalEvent: event,
                            value: this.getOptionValue(option),
                            option
                        });
                    }
                }
                break;
            }
        }
    }

    onHostKeyDown(_event: KeyboardEvent) {
        // Allow host-level key handling if needed
    }

    onListboxClick(event: any) {
        const option = event.option;
        if (option && !this.listboxViewChild()?.isOptionDisabled(option)) {
            this.onItemSelect.emit({
                originalEvent: event.originalEvent,
                value: this.getOptionValue(option),
                option
            });
        }
    }

    private findNextValidIndex(fromIndex: number): number {
        const listbox = this.listboxViewChild();
        if (!listbox) return fromIndex;

        const options = listbox.visibleOptions();

        for (let i = fromIndex + 1; i < options.length; i++) {
            if (listbox.isValidOption(options[i])) return i;
        }

        if (this.loop()) {
            for (let i = 0; i <= fromIndex; i++) {
                if (listbox.isValidOption(options[i])) return i;
            }
        }

        return fromIndex;
    }

    private findPrevValidIndex(fromIndex: number): number {
        const listbox = this.listboxViewChild();
        if (!listbox) return fromIndex;

        const options = listbox.visibleOptions();

        for (let i = fromIndex - 1; i >= 0; i--) {
            if (listbox.isValidOption(options[i])) return i;
        }

        if (this.loop()) {
            for (let i = options.length - 1; i >= fromIndex; i--) {
                if (listbox.isValidOption(options[i])) return i;
            }
        }

        return fromIndex;
    }

    /**
     * Focuses the search input.
     * @group Method
     */
    focusInput() {
        this.searchInputViewChild()?.nativeElement?.focus();
    }
}

@NgModule({
    imports: [CommandMenu, SharedModule],
    exports: [CommandMenu, SharedModule]
})
export class CommandMenuModule {}
