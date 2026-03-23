import { CommonModule } from '@angular/common';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { CommandMenu } from './commandmenu';

@Component({
    standalone: false,
    template: `
        <p-commandmenu
            [options]="options"
            [group]="group"
            [optionLabel]="optionLabel"
            [optionValue]="optionValue"
            [optionDisabled]="optionDisabled"
            [optionGroupLabel]="optionGroupLabel"
            [optionGroupChildren]="optionGroupChildren"
            [optionKeywords]="optionKeywords"
            [placeholder]="placeholder"
            [ariaLabel]="ariaLabel"
            [multiple]="multiple"
            [readonly]="readonly"
            [emptyMessage]="emptyMessage"
            [filter]="filter"
            (onItemSelect)="onItemSelect($event)"
            (onSearchChange)="onSearchChange($event)"
        ></p-commandmenu>
    `
})
class TestCommandMenuComponent {
    options: any[] = [
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' },
        { label: 'Option 3', value: 'opt3' }
    ];
    group: boolean = false;
    optionLabel: string | undefined;
    optionValue: string | undefined;
    optionDisabled: string | ((item: any) => boolean) | undefined;
    optionGroupLabel: string = 'label';
    optionGroupChildren: string = 'items';
    optionKeywords: string | undefined;
    placeholder: string | undefined;
    ariaLabel: string | undefined;
    multiple: boolean = false;
    readonly: boolean = false;
    emptyMessage: string = 'No results found';
    filter: ((label: string, search: string, keywords?: string[]) => number) | undefined;

    onItemSelect(_event: any) {}
    onSearchChange(_event: any) {}
}

@Component({
    standalone: false,
    template: `
        <p-commandmenu [options]="options">
            <ng-template #header let-search>
                <span class="custom-header">Search: {{ search }}</span>
            </ng-template>
            <ng-template #footer let-search>
                <span class="custom-footer">Footer: {{ search }}</span>
            </ng-template>
            <ng-template #item let-option let-index="index">
                <span class="custom-item">{{ option.label }} - {{ index }}</span>
            </ng-template>
            <ng-template #empty let-search>
                <span class="custom-empty">Nothing for "{{ search }}"</span>
            </ng-template>
        </p-commandmenu>
    `
})
class TestCommandMenuTemplateComponent {
    options: any[] = [
        { label: 'Alpha', value: 'a' },
        { label: 'Beta', value: 'b' }
    ];
}

@Component({
    standalone: false,
    template: `
        <p-commandmenu [options]="options" [group]="true" [optionGroupLabel]="'label'" [optionGroupChildren]="'items'">
            <ng-template #group let-group>
                <span class="custom-group">{{ group.label }}</span>
            </ng-template>
        </p-commandmenu>
    `
})
class TestCommandMenuGroupTemplateComponent {
    options: any[] = [
        {
            label: 'Group A',
            items: [
                { label: 'Item A1', value: 'a1' },
                { label: 'Item A2', value: 'a2' }
            ]
        }
    ];
}

async function createFixture<T>(component: new (...args: any[]) => T): Promise<ComponentFixture<T>> {
    await TestBed.configureTestingModule({
        imports: [CommandMenu, FormsModule, CommonModule],
        declarations: [component],
        providers: [provideZonelessChangeDetection(), provideNoopAnimations()]
    }).compileComponents();

    const fixture = TestBed.createComponent(component);
    fixture.changeDetectorRef.markForCheck();
    await fixture.whenStable();
    return fixture;
}

function getSearchInput(fixture: ComponentFixture<any>): HTMLInputElement {
    return fixture.debugElement.query(By.css('input[type="text"]')).nativeElement;
}

async function typeSearch(fixture: ComponentFixture<any>, value: string) {
    const input = getSearchInput(fixture);
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.changeDetectorRef.markForCheck();
    await fixture.whenStable();
}

function getOptions(fixture: ComponentFixture<any>): HTMLElement[] {
    return fixture.debugElement.queryAll(By.css('.p-listbox-option')).map((de) => de.nativeElement);
}

function getGroupHeaders(fixture: ComponentFixture<any>): HTMLElement[] {
    return fixture.debugElement.queryAll(By.css('.p-listbox-option-group')).map((de) => de.nativeElement);
}

function dispatchKeydown(fixture: ComponentFixture<any>, code: string) {
    const input = getSearchInput(fixture);
    input.dispatchEvent(new KeyboardEvent('keydown', { code, bubbles: true }));
}

describe('CommandMenu', () => {
    // ─── 1. Component Creation ───
    describe('Component Creation', () => {
        let fixture: ComponentFixture<TestCommandMenuComponent>;

        beforeEach(async () => {
            fixture = await createFixture(TestCommandMenuComponent);
        });

        it('should create the component', () => {
            const commandMenu = fixture.debugElement.query(By.directive(CommandMenu));
            expect(commandMenu).toBeTruthy();
        });

        it('should render search input', () => {
            const input = fixture.debugElement.query(By.css('input[type="text"]'));
            expect(input).toBeTruthy();
        });

        it('should render listbox', () => {
            const listbox = fixture.debugElement.query(By.css('p-listbox'));
            expect(listbox).toBeTruthy();
        });
    });

    // ─── 2. Options & Rendering ───
    describe('Options & Rendering', () => {
        let fixture: ComponentFixture<TestCommandMenuComponent>;

        beforeEach(async () => {
            fixture = await createFixture(TestCommandMenuComponent);
        });

        it('should display flat options', () => {
            const options = getOptions(fixture);
            expect(options.length).toBe(3);
            expect(options[0].textContent).toContain('Option 1');
            expect(options[1].textContent).toContain('Option 2');
            expect(options[2].textContent).toContain('Option 3');
        });

        it('should display grouped options with group headers', async () => {
            fixture.componentInstance.group = true;
            fixture.componentInstance.options = [
                {
                    label: 'Group A',
                    items: [
                        { label: 'Item A1', value: 'a1' },
                        { label: 'Item A2', value: 'a2' }
                    ]
                },
                {
                    label: 'Group B',
                    items: [{ label: 'Item B1', value: 'b1' }]
                }
            ];
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const headers = getGroupHeaders(fixture);
            expect(headers.length).toBe(2);
            expect(headers[0].textContent).toContain('Group A');
            expect(headers[1].textContent).toContain('Group B');

            const options = getOptions(fixture);
            expect(options.length).toBe(3);
        });

        it('should resolve option labels via optionLabel', async () => {
            fixture.componentInstance.optionLabel = 'name';
            fixture.componentInstance.options = [
                { name: 'First', id: 1 },
                { name: 'Second', id: 2 }
            ];
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const options = getOptions(fixture);
            expect(options[0].textContent).toContain('First');
            expect(options[1].textContent).toContain('Second');
        });

        it('should resolve option values via optionValue', async () => {
            spyOn(fixture.componentInstance, 'onItemSelect');
            fixture.componentInstance.optionValue = 'id';
            fixture.componentInstance.options = [
                { label: 'Item 1', id: 100 },
                { label: 'Item 2', id: 200 }
            ];
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const options = getOptions(fixture);
            options[0].click();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(fixture.componentInstance.onItemSelect).toHaveBeenCalledWith(jasmine.objectContaining({ value: 100 }));
        });
    });

    // ─── 3. Search & Filtering ───
    describe('Search & Filtering', () => {
        let fixture: ComponentFixture<TestCommandMenuComponent>;

        beforeEach(async () => {
            fixture = await createFixture(TestCommandMenuComponent);
        });

        it('should filter flat options based on search input', async () => {
            await typeSearch(fixture, 'Option 1');

            const options = getOptions(fixture);
            expect(options.length).toBe(1);
            expect(options[0].textContent).toContain('Option 1');
        });

        it('should emit onSearchChange when typing', async () => {
            spyOn(fixture.componentInstance, 'onSearchChange');

            await typeSearch(fixture, 'test');

            expect(fixture.componentInstance.onSearchChange).toHaveBeenCalledWith(jasmine.objectContaining({ query: 'test' }));
        });

        it('should filter grouped options and remove empty groups', async () => {
            fixture.componentInstance.group = true;
            fixture.componentInstance.options = [
                {
                    label: 'Fruits',
                    items: [
                        { label: 'Apple', value: 'apple' },
                        { label: 'Banana', value: 'banana' }
                    ]
                },
                {
                    label: 'Vegetables',
                    items: [{ label: 'Carrot', value: 'carrot' }]
                }
            ];
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            await typeSearch(fixture, 'Apple');

            const headers = getGroupHeaders(fixture);
            expect(headers.length).toBe(1);
            expect(headers[0].textContent).toContain('Fruits');

            const options = getOptions(fixture);
            expect(options.length).toBe(1);
            expect(options[0].textContent).toContain('Apple');
        });

        it('should sort results by relevance score', async () => {
            fixture.componentInstance.filter = (label: string, search: string) => {
                if (label.toLowerCase() === search.toLowerCase()) return 10;
                if (label.toLowerCase().startsWith(search.toLowerCase())) return 5;
                if (label.toLowerCase().includes(search.toLowerCase())) return 1;
                return 0;
            };
            fixture.componentInstance.options = [
                { label: 'Something Else Test', value: '1' },
                { label: 'Test', value: '2' },
                { label: 'Testing', value: '3' }
            ];
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            await typeSearch(fixture, 'Test');

            const options = getOptions(fixture);
            expect(options.length).toBe(3);
            expect(options[0].textContent).toContain('Test');
            expect(options[1].textContent).toContain('Testing');
            expect(options[2].textContent).toContain('Something Else Test');
        });

        it('should show empty message when no results match', async () => {
            await typeSearch(fixture, 'zzzzz');

            const options = getOptions(fixture);
            expect(options.length).toBe(0);

            const emptyEl = fixture.debugElement.query(By.css('.p-commandmenu-empty'));
            expect(emptyEl).toBeTruthy();
            expect(emptyEl.nativeElement.textContent).toContain('No results found');
        });

        it('should use custom filter function when provided', async () => {
            const customFilter = jasmine.createSpy('customFilter').and.callFake((label: string, search: string) => {
                return label.startsWith(search) ? 1 : 0;
            });
            fixture.componentInstance.filter = customFilter;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            await typeSearch(fixture, 'Option');

            expect(customFilter).toHaveBeenCalled();
            const options = getOptions(fixture);
            expect(options.length).toBe(3);
        });

        it('should filter using keywords (optionKeywords)', async () => {
            fixture.componentInstance.optionKeywords = 'tags';
            fixture.componentInstance.options = [
                { label: 'Save', value: 'save', tags: ['persist', 'store'] },
                { label: 'Delete', value: 'delete', tags: ['remove'] },
                { label: 'Open', value: 'open', tags: ['load'] }
            ];
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            await typeSearch(fixture, 'persist');

            const options = getOptions(fixture);
            expect(options.length).toBe(1);
            expect(options[0].textContent).toContain('Save');
        });

        it('should show all options when search is cleared', async () => {
            await typeSearch(fixture, 'Option 1');
            expect(getOptions(fixture).length).toBe(1);

            await typeSearch(fixture, '');
            expect(getOptions(fixture).length).toBe(3);
        });
    });

    // ─── 4. Keyboard Navigation ───
    describe('Keyboard Navigation', () => {
        let fixture: ComponentFixture<TestCommandMenuComponent>;

        beforeEach(async () => {
            fixture = await createFixture(TestCommandMenuComponent);
        });

        it('should navigate down with ArrowDown from search input', async () => {
            dispatchKeydown(fixture, 'ArrowDown');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const input = getSearchInput(fixture);
            const activedescendant = input.getAttribute('aria-activedescendant');
            expect(activedescendant).toBeTruthy();
        });

        it('should navigate up with ArrowUp from search input', async () => {
            dispatchKeydown(fixture, 'ArrowDown');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            dispatchKeydown(fixture, 'ArrowDown');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const afterDown = getSearchInput(fixture).getAttribute('aria-activedescendant');

            dispatchKeydown(fixture, 'ArrowUp');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const afterUp = getSearchInput(fixture).getAttribute('aria-activedescendant');
            expect(afterUp).toBeTruthy();
            expect(afterUp).not.toBe(afterDown);
        });

        it('should select focused option with Enter', async () => {
            spyOn(fixture.componentInstance, 'onItemSelect');

            dispatchKeydown(fixture, 'ArrowDown');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            dispatchKeydown(fixture, 'Enter');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(fixture.componentInstance.onItemSelect).toHaveBeenCalled();
        });

        it('should update aria-activedescendant on navigation', async () => {
            const input = getSearchInput(fixture);

            dispatchKeydown(fixture, 'ArrowDown');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            const first = input.getAttribute('aria-activedescendant');

            dispatchKeydown(fixture, 'ArrowDown');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            const second = input.getAttribute('aria-activedescendant');

            expect(first).toBeTruthy();
            expect(second).toBeTruthy();
            expect(first).not.toBe(second);
        });

        it('should skip disabled options during navigation', async () => {
            fixture.componentInstance.optionDisabled = 'disabled';
            fixture.componentInstance.options = [
                { label: 'Option 1', value: 'opt1' },
                { label: 'Option 2', value: 'opt2', disabled: true },
                { label: 'Option 3', value: 'opt3' }
            ];
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const input = getSearchInput(fixture);

            dispatchKeydown(fixture, 'ArrowDown');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            const first = input.getAttribute('aria-activedescendant');

            dispatchKeydown(fixture, 'ArrowDown');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            const second = input.getAttribute('aria-activedescendant');

            expect(first).toBeTruthy();
            expect(second).toBeTruthy();
            expect(first).not.toBe(second);
        });
    });

    // ─── 5. Item Selection ───
    describe('Item Selection', () => {
        let fixture: ComponentFixture<TestCommandMenuComponent>;

        beforeEach(async () => {
            fixture = await createFixture(TestCommandMenuComponent);
        });

        it('should emit onItemSelect on option click', async () => {
            spyOn(fixture.componentInstance, 'onItemSelect');

            const options = getOptions(fixture);
            options[0].click();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(fixture.componentInstance.onItemSelect).toHaveBeenCalledWith(
                jasmine.objectContaining({
                    option: jasmine.objectContaining({ label: 'Option 1' })
                })
            );
        });

        it('should emit correct value using optionValue', async () => {
            spyOn(fixture.componentInstance, 'onItemSelect');
            fixture.componentInstance.optionValue = 'value';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const options = getOptions(fixture);
            options[1].click();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(fixture.componentInstance.onItemSelect).toHaveBeenCalledWith(jasmine.objectContaining({ value: 'opt2' }));
        });

        it('should not emit onItemSelect for disabled options', async () => {
            spyOn(fixture.componentInstance, 'onItemSelect');
            fixture.componentInstance.optionDisabled = 'disabled';
            fixture.componentInstance.options = [
                { label: 'Enabled', value: 'e' },
                { label: 'Disabled', value: 'd', disabled: true }
            ];
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const options = getOptions(fixture);
            options[1].click();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(fixture.componentInstance.onItemSelect).not.toHaveBeenCalled();
        });

        it('should invoke option.command callback on selection', async () => {
            const commandSpy = jasmine.createSpy('command');
            fixture.componentInstance.options = [{ label: 'With Command', value: 'cmd', command: commandSpy }];
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const options = getOptions(fixture);
            options[0].click();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(commandSpy).toHaveBeenCalled();
        });

        it('should not select when readonly', async () => {
            spyOn(fixture.componentInstance, 'onItemSelect');
            fixture.componentInstance.readonly = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const options = getOptions(fixture);
            options[0].click();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(fixture.componentInstance.onItemSelect).not.toHaveBeenCalled();
        });
    });

    // ─── 6. Disabled Options ───
    describe('Disabled Options', () => {
        let fixture: ComponentFixture<TestCommandMenuComponent>;

        beforeEach(async () => {
            fixture = await createFixture(TestCommandMenuComponent);
            spyOn(fixture.componentInstance, 'onItemSelect');
            fixture.componentInstance.optionDisabled = 'disabled';
            fixture.componentInstance.options = [
                { label: 'Enabled', value: 'e' },
                { label: 'Disabled', value: 'd', disabled: true },
                { label: 'Also Enabled', value: 'ae' }
            ];
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
        });

        it('should apply disabled styling (aria-disabled attribute)', () => {
            const options = fixture.debugElement.queryAll(By.css('.p-listbox-option'));
            const disabledOption = options[1].nativeElement;
            expect(disabledOption.getAttribute('aria-disabled')).toBe('true');
        });

        it('should not select disabled options on click', async () => {
            const options = getOptions(fixture);
            options[1].click();
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            expect(fixture.componentInstance.onItemSelect).not.toHaveBeenCalled();
        });

        it('should skip disabled options during keyboard navigation', async () => {
            const input = getSearchInput(fixture);

            dispatchKeydown(fixture, 'ArrowDown');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            const first = input.getAttribute('aria-activedescendant');

            dispatchKeydown(fixture, 'ArrowDown');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            const second = input.getAttribute('aria-activedescendant');

            expect(first).toBeTruthy();
            expect(second).toBeTruthy();
            expect(first).not.toBe(second);
        });
    });

    // ─── 7. Templates ───
    describe('Templates', () => {
        it('should render custom item template', async () => {
            const fixture = await createFixture(TestCommandMenuTemplateComponent);

            const customItems = fixture.debugElement.queryAll(By.css('.custom-item'));
            expect(customItems.length).toBe(2);
            expect(customItems[0].nativeElement.textContent).toContain('Alpha - 0');
            expect(customItems[1].nativeElement.textContent).toContain('Beta - 1');
        });

        it('should render custom group template', async () => {
            const fixture = await createFixture(TestCommandMenuGroupTemplateComponent);

            const customGroups = fixture.debugElement.queryAll(By.css('.custom-group'));
            expect(customGroups.length).toBe(1);
            expect(customGroups[0].nativeElement.textContent).toContain('Group A');
        });

        it('should render custom header template with search context', async () => {
            const fixture = await createFixture(TestCommandMenuTemplateComponent);

            const header = fixture.debugElement.query(By.css('.custom-header'));
            expect(header).toBeTruthy();
            expect(header.nativeElement.textContent).toContain('Search:');
        });

        it('should render custom footer template with search context', async () => {
            const fixture = await createFixture(TestCommandMenuTemplateComponent);

            const footer = fixture.debugElement.query(By.css('.custom-footer'));
            expect(footer).toBeTruthy();
            expect(footer.nativeElement.textContent).toContain('Footer:');
        });

        it('should render custom empty template when no results', async () => {
            const fixture = await createFixture(TestCommandMenuTemplateComponent);

            await typeSearch(fixture, 'zzzznonexistent');

            const customEmpty = fixture.debugElement.query(By.css('.custom-empty'));
            expect(customEmpty).toBeTruthy();
            expect(customEmpty.nativeElement.textContent).toContain('Nothing for "zzzznonexistent"');
        });
    });

    // ─── 8. Accessibility ───
    describe('Accessibility', () => {
        let fixture: ComponentFixture<TestCommandMenuComponent>;

        beforeEach(async () => {
            fixture = await createFixture(TestCommandMenuComponent);
        });

        it('should have role="combobox" on search input', () => {
            const input = getSearchInput(fixture);
            expect(input.getAttribute('role')).toBe('combobox');
        });

        it('should set aria-expanded="true"', () => {
            const input = getSearchInput(fixture);
            expect(input.getAttribute('aria-expanded')).toBe('true');
        });

        it('should set aria-controls to list id', () => {
            const input = getSearchInput(fixture);
            const ariaControls = input.getAttribute('aria-controls');
            expect(ariaControls).toBeTruthy();
            expect(ariaControls).toContain('_list');
        });

        it('should set aria-activedescendant when option is focused', async () => {
            dispatchKeydown(fixture, 'ArrowDown');
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const input = getSearchInput(fixture);
            expect(input.getAttribute('aria-activedescendant')).toBeTruthy();
        });

        it('should set aria-label when provided', async () => {
            fixture.componentInstance.ariaLabel = 'Command palette';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const input = getSearchInput(fixture);
            expect(input.getAttribute('aria-label')).toBe('Command palette');
        });

        it('should have autocomplete="off"', () => {
            const input = getSearchInput(fixture);
            expect(input.getAttribute('autocomplete')).toBe('off');
        });
    });

    // ─── 9. Public API ───
    describe('Public API', () => {
        let fixture: ComponentFixture<TestCommandMenuComponent>;

        beforeEach(async () => {
            fixture = await createFixture(TestCommandMenuComponent);
        });

        it('should focus input via focusInput() method', () => {
            const commandMenu = fixture.debugElement.query(By.directive(CommandMenu)).componentInstance as CommandMenu;
            const input = getSearchInput(fixture);
            spyOn(input, 'focus');

            commandMenu.focusInput();

            expect(input.focus).toHaveBeenCalled();
        });

        it('should support placeholder prop', async () => {
            fixture.componentInstance.placeholder = 'Type a command...';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();

            const input = getSearchInput(fixture);
            expect(input.getAttribute('placeholder')).toBe('Type a command...');
        });
    });
});
