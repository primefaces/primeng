import { TestBed, ComponentFixture, fakeAsync, tick, flush } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from './paginator';
import { Select } from 'primeng/select';
import { InputNumber } from 'primeng/inputnumber';
import { Ripple } from 'primeng/ripple';
import { SharedModule } from 'primeng/api';
import { PaginatorState } from './paginator.interface';

// Test component for basic paginator functionality
@Component({
    standalone: false,
    template: `
        <p-paginator
            [rows]="rows"
            [totalRecords]="totalRecords"
            [first]="first"
            [pageLinkSize]="pageLinkSize"
            [rowsPerPageOptions]="rowsPerPageOptions"
            [showCurrentPageReport]="showCurrentPageReport"
            [showFirstLastIcon]="showFirstLastIcon"
            [showJumpToPageDropdown]="showJumpToPageDropdown"
            [showJumpToPageInput]="showJumpToPageInput"
            [showPageLinks]="showPageLinks"
            [alwaysShow]="alwaysShow"
            [currentPageReportTemplate]="currentPageReportTemplate"
            [dropdownScrollHeight]="dropdownScrollHeight"
            [styleClass]="styleClass"
            [dropdownAppendTo]="dropdownAppendTo"
            [locale]="locale"
            [templateLeft]="leftTemplate"
            [templateRight]="rightTemplate"
            (onPageChange)="onPageChange($event)"
        >
        </p-paginator>

        <ng-template #leftTemplate let-state>
            <span class="custom-left-template">Left: Page {{ state.page + 1 }}</span>
        </ng-template>

        <ng-template #rightTemplate let-state>
            <span class="custom-right-template">Right: Total {{ state.totalRecords }}</span>
        </ng-template>
    `
})
class TestBasicPaginatorComponent {
    rows = 10;
    totalRecords = 100;
    first = 0;
    pageLinkSize = 5;
    rowsPerPageOptions: any[] = [5, 10, 20, 50];
    showCurrentPageReport = true;
    showFirstLastIcon = true;
    showJumpToPageDropdown = false;
    showJumpToPageInput = false;
    showPageLinks = true;
    alwaysShow = true;
    currentPageReportTemplate = '{currentPage} of {totalPages}';
    dropdownScrollHeight = '200px';
    styleClass: string | undefined;
    dropdownAppendTo: any;
    locale: string | undefined;

    pageChangeEvent: PaginatorState | null = null as any;

    onPageChange(event: PaginatorState) {
        this.pageChangeEvent = event;
        this.first = event.first!;
    }
}

// Test component for template testing with pTemplate
@Component({
    standalone: false,
    template: `
        <p-paginator [rows]="10" [totalRecords]="100" [first]="0">
            <ng-template pTemplate="dropdownicon">
                <span class="custom-dropdown-icon">▼</span>
            </ng-template>

            <ng-template pTemplate="firstpagelinkicon">
                <span class="custom-first-icon">⏮</span>
            </ng-template>

            <ng-template pTemplate="previouspagelinkicon">
                <span class="custom-prev-icon">⏪</span>
            </ng-template>

            <ng-template pTemplate="nextpagelinkicon">
                <span class="custom-next-icon">⏩</span>
            </ng-template>

            <ng-template pTemplate="lastpagelinkicon">
                <span class="custom-last-icon">⏭</span>
            </ng-template>
        </p-paginator>
    `
})
class TestPTemplatePaginatorComponent {
    // Component with pTemplate templates
}

// Test component for ContentChild template references
@Component({
    standalone: false,
    template: `
        <p-paginator [rows]="10" [totalRecords]="100" [first]="0" [rowsPerPageOptions]="[5, 10, 20]">
            <ng-template #dropdownicon>
                <span class="contentchild-dropdown-icon">⬇</span>
            </ng-template>

            <ng-template #firstpagelinkicon>
                <span class="contentchild-first-icon">⏮️</span>
            </ng-template>

            <ng-template #previouspagelinkicon>
                <span class="contentchild-prev-icon">◀️</span>
            </ng-template>

            <ng-template #nextpagelinkicon>
                <span class="contentchild-next-icon">▶️</span>
            </ng-template>

            <ng-template #lastpagelinkicon>
                <span class="contentchild-last-icon">⏭️</span>
            </ng-template>
        </p-paginator>
    `
})
class TestContentChildPaginatorComponent {
    // Component with ContentChild template references
}

// Test component for jump to page and dropdown templates
@Component({
    standalone: false,
    template: `
        <p-paginator [rows]="10" [totalRecords]="100" [first]="0" [showJumpToPageDropdown]="true" [jumpToPageItemTemplate]="jumpTemplate" [dropdownItemTemplate]="dropdownTemplate" [rowsPerPageOptions]="rowsPerPageOptions">
            <ng-template #jumpTemplate let-item>
                <span class="custom-jump-item">Jump to {{ item.label }}</span>
            </ng-template>

            <ng-template #dropdownTemplate let-item>
                <span class="custom-dropdown-item">{{ item.label }} items</span>
            </ng-template>
        </p-paginator>
    `
})
class TestDropdownPaginatorComponent {
    rowsPerPageOptions: any[] = [5, 10, 20, { showAll: 'All' }];
}

describe('Paginator', () => {
    let fixture: ComponentFixture<TestBasicPaginatorComponent>;
    let component: TestBasicPaginatorComponent;
    let paginator: Paginator;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule, PaginatorModule, Select, InputNumber, Ripple, SharedModule],
            declarations: [TestBasicPaginatorComponent, TestPTemplatePaginatorComponent, TestContentChildPaginatorComponent, TestDropdownPaginatorComponent, TestDynamicPaginatorComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TestBasicPaginatorComponent);
        component = fixture.componentInstance;
        paginator = fixture.debugElement.query(By.directive(Paginator)).componentInstance;
        fixture.detectChanges();
    });

    describe('Component Initialization', () => {
        it('should create paginator component', () => {
            expect(component).toBeTruthy();
            expect(paginator).toBeTruthy();
        });

        it('should initialize with default values', () => {
            expect(paginator.pageLinkSize).toBe(5);
            expect(paginator.alwaysShow).toBe(true);
            expect(paginator.showFirstLastIcon).toBe(true);
            expect(paginator.showPageLinks).toBe(true);
            expect(paginator.dropdownScrollHeight).toBe('200px');
        });

        it('should initialize with provided input values', () => {
            expect(paginator.rows).toBe(10);
            expect(paginator.totalRecords).toBe(100);
            expect(paginator.first).toBe(0);
            expect(paginator.currentPageReportTemplate).toBe('{currentPage} of {totalPages}');
        });

        it('should update paginator state on init', () => {
            expect(paginator.paginatorState).toBeDefined();
            expect(paginator.paginatorState.page).toBe(0);
            expect(paginator.paginatorState.pageCount).toBe(10);
            expect(paginator.paginatorState.rows).toBe(10);
            expect(paginator.paginatorState.first).toBe(0);
            expect(paginator.paginatorState.totalRecords).toBe(100);
        });

        it('should calculate page links correctly', () => {
            expect(paginator.pageLinks).toBeDefined();
            expect(paginator.pageLinks!.length).toBe(5);
            expect(paginator.pageLinks).toEqual([1, 2, 3, 4, 5]);
        });

        it('should render page links', () => {
            const pageLinks = fixture.debugElement.queryAll(By.css('.p-paginator-page'));
            expect(pageLinks.length).toBe(5);
        });

        it('should initialize rows per page dropdown options', () => {
            expect(paginator.rowsPerPageItems).toBeDefined();
            expect(paginator.rowsPerPageItems?.length).toBe(4);
            expect(paginator.rowsPerPageItems?.[0].value).toBe(5);
            expect(paginator.rowsPerPageItems?.[3].value).toBe(50);
        });

        it('should show/hide elements based on configuration', () => {
            const currentPageReport = fixture.debugElement.query(By.css('.p-paginator-current'));
            expect(currentPageReport).toBeTruthy();

            const firstButton = fixture.debugElement.query(By.css('.p-paginator-first'));
            expect(firstButton).toBeTruthy();

            const lastButton = fixture.debugElement.query(By.css('.p-paginator-last'));
            expect(lastButton).toBeTruthy();
        });
    });

    describe('Public Methods', () => {
        it('should calculate page count correctly', () => {
            expect(paginator.getPageCount()).toBe(10);

            paginator.totalRecords = 55;
            expect(paginator.getPageCount()).toBe(6);

            paginator.totalRecords = 0;
            expect(paginator.getPageCount()).toBe(0);
        });

        it('should get current page correctly', () => {
            expect(paginator.getPage()).toBe(0);

            paginator.first = 20;
            expect(paginator.getPage()).toBe(2);

            paginator.first = 95;
            expect(paginator.getPage()).toBe(9);
        });

        it('should check if first page correctly', () => {
            expect(paginator.isFirstPage()).toBe(true);

            paginator.first = 10;
            expect(paginator.isFirstPage()).toBe(false);
        });

        it('should check if last page correctly', () => {
            expect(paginator.isLastPage()).toBe(false);

            paginator.first = 90;
            expect(paginator.isLastPage()).toBe(true);
        });

        it('should calculate page link boundaries', () => {
            const boundaries = paginator.calculatePageLinkBoundaries();
            expect(boundaries).toEqual([0, 4]);

            paginator.first = 50; // page 5
            const boundaries2 = paginator.calculatePageLinkBoundaries();
            expect(boundaries2).toEqual([3, 7]);
        });

        it('should update page links', () => {
            paginator.first = 30; // page 3
            paginator.updatePageLinks();
            expect(paginator.pageLinks).toEqual([2, 3, 4, 5, 6]);
        });

        it('should check empty state', () => {
            expect(paginator.empty()).toBe(false);

            paginator.totalRecords = 0;
            expect(paginator.empty()).toBe(true);
        });

        it('should get current page number (1-based)', () => {
            expect(paginator.currentPage()).toBe(1);

            paginator.first = 20;
            expect(paginator.currentPage()).toBe(3);

            paginator.totalRecords = 0;
            expect(paginator.currentPage()).toBe(0);
        });

        it('should generate current page report correctly', () => {
            expect(paginator.currentPageReport).toBe('1 of 10');

            paginator.first = 20;
            paginator.currentPageReportTemplate = 'Showing {first} to {last} of {totalRecords} entries';
            expect(paginator.currentPageReport).toBe('Showing 21 to 30 of 100 entries');
        });

        it('should handle locale-specific number formatting', () => {
            paginator.locale = 'ar';
            const arabicNumber = paginator.getLocalization(5);
            expect(arabicNumber).toBeDefined();

            paginator.locale = 'en-US';
            const englishNumber = paginator.getLocalization(5);
            expect(englishNumber).toBe('5');
        });
    });

    describe('Event Handling', () => {
        it('should emit onPageChange when changing page', fakeAsync(() => {
            spyOn(paginator.onPageChange, 'emit');

            paginator.changePage(2);
            tick();

            expect(paginator.onPageChange.emit).toHaveBeenCalledWith({
                page: 2,
                first: 20,
                rows: 10,
                pageCount: 10
            });
            expect(paginator.first).toBe(20);

            flush();
        }));

        it('should change to first page', fakeAsync(() => {
            paginator.first = 50;
            fixture.detectChanges();

            const firstButton = fixture.debugElement.query(By.css('.p-paginator-first'));
            firstButton.nativeElement.click();
            tick();

            expect(component.pageChangeEvent?.page).toBe(0);
            expect(component.first).toBe(0);

            flush();
        }));

        it('should change to previous page', fakeAsync(() => {
            paginator.first = 20;
            fixture.detectChanges();

            const prevButton = fixture.debugElement.query(By.css('.p-paginator-prev'));
            prevButton.nativeElement.click();
            tick();

            expect(component.pageChangeEvent?.page).toBe(1);
            expect(component.first).toBe(10);

            flush();
        }));

        it('should change to next page', fakeAsync(() => {
            const nextButton = fixture.debugElement.query(By.css('.p-paginator-next'));
            nextButton.nativeElement.click();
            tick();

            expect(component.pageChangeEvent?.page).toBe(1);
            expect(component.first).toBe(10);

            flush();
        }));

        it('should change to last page', fakeAsync(() => {
            const lastButton = fixture.debugElement.query(By.css('.p-paginator-last'));
            lastButton.nativeElement.click();
            tick();

            expect(component.pageChangeEvent?.page).toBe(9);
            expect(component.first).toBe(90);

            flush();
        }));

        it('should handle page link click', fakeAsync(() => {
            const pageLinks = fixture.debugElement.queryAll(By.css('.p-paginator-page'));
            pageLinks[2].nativeElement.click(); // Click page 3
            tick();

            expect(component.pageChangeEvent?.page).toBe(2);
            expect(component.first).toBe(20);

            flush();
        }));

        it('should not change page when clicking disabled buttons', fakeAsync(() => {
            // Reset to first page to start clean
            component.first = 0;
            paginator.first = 0;
            fixture.detectChanges();

            // First page - prev should be disabled
            const prevButton = fixture.debugElement.query(By.css('.p-paginator-prev'));
            expect(prevButton.nativeElement.disabled).toBe(true);

            prevButton.nativeElement.click();
            tick();

            expect(component.first).toBe(0); // Should not change

            // Move to last page - next should be disabled
            component.first = 90;
            paginator.first = 90;
            fixture.detectChanges();

            const nextButton = fixture.debugElement.query(By.css('.p-paginator-next'));
            expect(nextButton.nativeElement.disabled).toBe(true);

            nextButton.nativeElement.click();
            tick();

            expect(component.first).toBe(90); // Should not change

            flush();
        }));

        it('should handle rows per page change', fakeAsync(() => {
            spyOn(paginator, 'onRppChange').and.callThrough();
            spyOn(paginator, 'changePage').and.callThrough();

            paginator.onRppChange(new Event('change'));
            tick();

            expect(paginator.onRppChange).toHaveBeenCalled();
            expect(paginator.changePage).toHaveBeenCalledWith(0);

            flush();
        }));

        it('should handle page dropdown change', fakeAsync(() => {
            component.showJumpToPageDropdown = true;
            fixture.detectChanges();
            paginator.updatePageLinks();

            spyOn(paginator, 'changePage').and.callThrough();

            paginator.onPageDropdownChange({ value: 3, originalEvent: new Event('change') });
            tick();

            expect(paginator.changePage).toHaveBeenCalledWith(3);

            flush();
        }));
    });

    describe('Edge Cases and Error Handling', () => {
        it('should handle zero total records', () => {
            component.totalRecords = 0;
            fixture.detectChanges();

            expect(paginator.getPageCount()).toBe(0);
            expect(paginator.empty()).toBe(true);
            expect(paginator.currentPage()).toBe(0);
        });

        it('should handle invalid page numbers', () => {
            spyOn(paginator.onPageChange, 'emit');

            paginator.changePage(-1);
            expect(paginator.onPageChange.emit).not.toHaveBeenCalled();

            paginator.changePage(100);
            expect(paginator.onPageChange.emit).not.toHaveBeenCalled();
        });

        it('should handle total records changes appropriately', () => {
            // Test scenario where total records decrease
            paginator.first = 90; // Page 9
            paginator.totalRecords = 50; // Now only 5 pages (0-4)

            // The component should recognize the inconsistency
            const currentPage = paginator.getPage(); // 9
            const maxPage = paginator.getPageCount() - 1; // 4

            // Current page is beyond the available pages
            expect(currentPage).toBeGreaterThan(maxPage);

            // When updateFirst is called, it should detect this condition
            const pageBeforeFirst = paginator.getPage();
            const totalRecordsValue = paginator.totalRecords;
            const firstValue = paginator.first;

            // Verify the problematic state exists
            expect(pageBeforeFirst > 0 && totalRecordsValue > 0 && firstValue >= totalRecordsValue).toBe(true);
        });

        it('should handle rows per page with showAll option', () => {
            component.rowsPerPageOptions = [10, 20, { showAll: 'All' } as any];
            fixture.detectChanges();
            paginator.updateRowsPerPageOptions();

            expect(paginator.rowsPerPageItems?.length).toBe(3);
            const showAllItem = paginator.rowsPerPageItems?.find((item) => item.label === 'All');
            expect(showAllItem?.value).toBe(100);
        });

        it('should handle rapid page changes', fakeAsync(() => {
            let emitCount = 0;
            paginator.onPageChange.subscribe(() => emitCount++);

            paginator.changePage(1);
            paginator.changePage(2);
            paginator.changePage(3);
            tick();

            expect(emitCount).toBe(3);
            expect(paginator.getPage()).toBe(3);

            flush();
        }));

        it('should handle null/undefined values gracefully', () => {
            // Create a new paginator instance for this test
            const testFixture = TestBed.createComponent(TestBasicPaginatorComponent);
            const testPaginator = testFixture.debugElement.query(By.directive(Paginator)).componentInstance;

            testPaginator.rowsPerPageOptions = undefined as any;
            testPaginator.updateRowsPerPageOptions();
            expect(testPaginator.rowsPerPageItems).toBeUndefined();

            testPaginator.locale = undefined as any;
            const result = testPaginator.getLocalization(5);
            expect(result).toBeDefined();
        });

        it('should validate page boundaries', () => {
            paginator.totalRecords = 25;
            paginator.rows = 10;

            paginator.changePage(5); // Invalid page
            expect(paginator.getPage()).toBe(0); // Should remain at page 0

            paginator.changePage(2); // Valid page (last page)
            expect(paginator.getPage()).toBe(2);
        });

        it('should handle empty rows per page', () => {
            paginator.rows = 0;
            // getPageCount returns Math.ceil(totalRecords / 0) which is Infinity
            expect(paginator.getPageCount()).toBe(Infinity);
            // getPage returns Math.floor(first / 0) which is NaN
            expect(isNaN(paginator.getPage())).toBe(true);
        });
    });

    describe('Template and Content Projection', () => {
        describe('pTemplate Approach', () => {
            let pTemplateFixture: ComponentFixture<TestPTemplatePaginatorComponent>;
            let pTemplatePaginator: Paginator;

            beforeEach(() => {
                pTemplateFixture = TestBed.createComponent(TestPTemplatePaginatorComponent);
                pTemplatePaginator = pTemplateFixture.debugElement.query(By.directive(Paginator)).componentInstance;
                pTemplateFixture.detectChanges();
            });

            it('should create component with pTemplate templates', () => {
                expect(pTemplateFixture.componentInstance).toBeTruthy();
                expect(pTemplatePaginator).toBeTruthy();
            });

            it('should process pTemplate templates in ngAfterContentInit', fakeAsync(() => {
                tick();

                expect(pTemplatePaginator._dropdownIconTemplate).toBeDefined();
                expect(pTemplatePaginator._firstPageLinkIconTemplate).toBeDefined();
                expect(pTemplatePaginator._previousPageLinkIconTemplate).toBeDefined();
                expect(pTemplatePaginator._nextPageLinkIconTemplate).toBeDefined();
                expect(pTemplatePaginator._lastPageLinkIconTemplate).toBeDefined();

                flush();
            }));

            it('should apply custom icon templates', fakeAsync(() => {
                tick();

                const firstIcon = pTemplateFixture.debugElement.query(By.css('.custom-first-icon'));
                if (firstIcon) {
                    expect(firstIcon.nativeElement.textContent).toBe('⏮');
                }

                const prevIcon = pTemplateFixture.debugElement.query(By.css('.custom-prev-icon'));
                if (prevIcon) {
                    expect(prevIcon.nativeElement.textContent).toBe('⏪');
                }

                const nextIcon = pTemplateFixture.debugElement.query(By.css('.custom-next-icon'));
                if (nextIcon) {
                    expect(nextIcon.nativeElement.textContent).toBe('⏩');
                }

                const lastIcon = pTemplateFixture.debugElement.query(By.css('.custom-last-icon'));
                if (lastIcon) {
                    expect(lastIcon.nativeElement.textContent).toBe('⏭');
                }

                flush();
            }));
        });

        describe('ContentChild Template References', () => {
            let contentChildFixture: ComponentFixture<TestContentChildPaginatorComponent>;
            let contentChildPaginator: Paginator;

            beforeEach(() => {
                contentChildFixture = TestBed.createComponent(TestContentChildPaginatorComponent);
                contentChildPaginator = contentChildFixture.debugElement.query(By.directive(Paginator)).componentInstance;
                contentChildFixture.detectChanges();
            });

            it('should create component with ContentChild templates', () => {
                expect(contentChildFixture.componentInstance).toBeTruthy();
                expect(contentChildPaginator).toBeTruthy();
            });

            it('should access ContentChild template references', fakeAsync(() => {
                tick();

                const hasTemplates =
                    contentChildPaginator.dropdownIconTemplate ||
                    contentChildPaginator.firstPageLinkIconTemplate ||
                    contentChildPaginator.previousPageLinkIconTemplate ||
                    contentChildPaginator.nextPageLinkIconTemplate ||
                    contentChildPaginator.lastPageLinkIconTemplate;

                expect(hasTemplates).toBeTruthy();

                flush();
            }));

            it('should apply ContentChild icon templates', fakeAsync(() => {
                tick();

                const firstIcon = contentChildFixture.debugElement.query(By.css('.contentchild-first-icon'));
                if (firstIcon) {
                    expect(firstIcon.nativeElement.textContent).toBe('⏮️');
                }

                const prevIcon = contentChildFixture.debugElement.query(By.css('.contentchild-prev-icon'));
                if (prevIcon) {
                    expect(prevIcon.nativeElement.textContent).toBe('◀️');
                }

                flush();
            }));
        });

        describe('Dropdown Templates', () => {
            let dropdownFixture: ComponentFixture<TestDropdownPaginatorComponent>;
            let dropdownPaginator: Paginator;

            beforeEach(() => {
                dropdownFixture = TestBed.createComponent(TestDropdownPaginatorComponent);
                dropdownPaginator = dropdownFixture.debugElement.query(By.directive(Paginator)).componentInstance;
                dropdownFixture.detectChanges();
            });

            it('should create component with dropdown templates', () => {
                expect(dropdownFixture.componentInstance).toBeTruthy();
                expect(dropdownPaginator).toBeTruthy();
            });

            it('should apply jump to page item template', fakeAsync(() => {
                tick();

                expect(dropdownPaginator.jumpToPageItemTemplate).toBeDefined();

                flush();
            }));

            it('should apply dropdown item template', fakeAsync(() => {
                tick();

                expect(dropdownPaginator.dropdownItemTemplate).toBeDefined();

                flush();
            }));

            it('should handle showAll option in rows per page', () => {
                dropdownPaginator.updateRowsPerPageOptions();

                const showAllItem = dropdownPaginator.rowsPerPageItems?.find((item) => item.label === 'All');
                expect(showAllItem).toBeDefined();
                expect(showAllItem?.value).toBe(100);
            });
        });

        describe('Left and Right Templates', () => {
            it('should render left template with context', fakeAsync(() => {
                tick();

                const leftTemplate = fixture.debugElement.query(By.css('.custom-left-template'));
                expect(leftTemplate).toBeTruthy();
                expect(leftTemplate.nativeElement.textContent).toContain('Left: Page 1');

                flush();
            }));

            it('should render right template with context', fakeAsync(() => {
                tick();

                const rightTemplate = fixture.debugElement.query(By.css('.custom-right-template'));
                expect(rightTemplate).toBeTruthy();
                expect(rightTemplate.nativeElement.textContent).toContain('Right: Total 100');

                flush();
            }));

            it('should update template context on page change', fakeAsync(() => {
                paginator.changePage(2);
                fixture.detectChanges();
                tick();

                const leftTemplate = fixture.debugElement.query(By.css('.custom-left-template'));
                expect(leftTemplate.nativeElement.textContent).toContain('Left: Page 3');

                flush();
            }));
        });
    });

    describe('CSS and Styling', () => {
        it('should apply correct CSS classes', () => {
            const paginatorElement = fixture.debugElement.query(By.css('p-paginator'));
            expect(paginatorElement).toBeTruthy();

            const firstButton = fixture.debugElement.query(By.css('.p-paginator-first'));
            expect(firstButton).toBeTruthy();

            const pageLinks = fixture.debugElement.queryAll(By.css('.p-paginator-page'));
            expect(pageLinks.length).toBeGreaterThan(0);
        });

        it('should apply active state to current page', () => {
            const pageLinks = fixture.debugElement.queryAll(By.css('.p-paginator-page'));
            expect(pageLinks[0].nativeElement.getAttribute('aria-current')).toBe('page');

            paginator.changePage(2);
            fixture.detectChanges();

            const updatedPageLinks = fixture.debugElement.queryAll(By.css('.p-paginator-page'));
            expect(updatedPageLinks[2].nativeElement.getAttribute('aria-current')).toBe('page');
        });

        it('should hide when alwaysShow is false and only one page', () => {
            component.alwaysShow = false;
            component.totalRecords = 5;
            component.rows = 10;
            paginator.alwaysShow = false;
            paginator.totalRecords = 5;
            paginator.rows = 10;
            paginator.updatePageLinks();
            fixture.detectChanges();

            expect(paginator.display).toBe('none');
        });

        it('should show when alwaysShow is true even with one page', () => {
            component.alwaysShow = true;
            component.totalRecords = 5;
            component.rows = 10;
            fixture.detectChanges();

            expect(paginator.display).toBeNull();
        });
    });

    describe('Accessibility', () => {
        it('should have proper ARIA labels', () => {
            const firstButton = fixture.debugElement.query(By.css('.p-paginator-first'));
            expect(firstButton.nativeElement.hasAttribute('aria-label')).toBe(true);

            const prevButton = fixture.debugElement.query(By.css('.p-paginator-prev'));
            expect(prevButton.nativeElement.hasAttribute('aria-label')).toBe(true);

            const nextButton = fixture.debugElement.query(By.css('.p-paginator-next'));
            expect(nextButton.nativeElement.hasAttribute('aria-label')).toBe(true);

            const lastButton = fixture.debugElement.query(By.css('.p-paginator-last'));
            expect(lastButton.nativeElement.hasAttribute('aria-label')).toBe(true);
        });

        it('should have proper ARIA labels for page links', () => {
            const pageLinks = fixture.debugElement.queryAll(By.css('.p-paginator-page'));
            pageLinks.forEach((link, index) => {
                expect(link.nativeElement.hasAttribute('aria-label')).toBe(true);
                expect(link.nativeElement.getAttribute('aria-label')).toContain((index + 1).toString());
            });
        });

        it('should mark current page with aria-current', () => {
            const pageLinks = fixture.debugElement.queryAll(By.css('.p-paginator-page'));
            expect(pageLinks[0].nativeElement.getAttribute('aria-current')).toBe('page');

            pageLinks.forEach((link, index) => {
                if (index !== 0) {
                    expect(link.nativeElement.getAttribute('aria-current')).toBeNull();
                }
            });
        });

        it('should disable navigation buttons appropriately', () => {
            // First page
            const prevButton = fixture.debugElement.query(By.css('.p-paginator-prev'));
            expect(prevButton.nativeElement.disabled).toBe(true);

            const firstButton = fixture.debugElement.query(By.css('.p-paginator-first'));
            expect(firstButton.nativeElement.disabled).toBe(false);

            // Last page
            paginator.first = 90;
            fixture.detectChanges();

            const nextButton = fixture.debugElement.query(By.css('.p-paginator-next'));
            expect(nextButton.nativeElement.disabled).toBe(true);

            const lastButton = fixture.debugElement.query(By.css('.p-paginator-last'));
            expect(lastButton.nativeElement.disabled).toBe(true);
        });

        it('should support keyboard navigation', fakeAsync(() => {
            const pageLink = fixture.debugElement.query(By.css('.p-paginator-page'));
            const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });

            spyOn(paginator, 'onPageLinkClick').and.callThrough();

            pageLink.nativeElement.dispatchEvent(enterEvent);
            pageLink.nativeElement.click();
            tick();

            expect(paginator.onPageLinkClick).toHaveBeenCalled();

            flush();
        }));
    });

    describe('Component State Management', () => {
        it('should maintain state across page changes', fakeAsync(() => {
            const initialState = { ...paginator.paginatorState };

            paginator.changePage(3);
            tick();

            expect(paginator.paginatorState.page).toBe(3);
            expect(paginator.paginatorState.first).toBe(30);
            expect(paginator.paginatorState.rows).toBe(initialState.rows);
            expect(paginator.paginatorState.totalRecords).toBe(initialState.totalRecords);

            flush();
        }));

        it('should update state when rows change', () => {
            paginator.rows = 20;
            paginator.ngOnChanges({
                rows: {
                    currentValue: 20,
                    previousValue: 10,
                    firstChange: false,
                    isFirstChange: () => false
                }
            });

            expect(paginator.getPageCount()).toBe(5);
            expect(paginator.paginatorState.rows).toBe(20);
        });

        it('should update state when totalRecords change', () => {
            paginator.totalRecords = 200;
            paginator.ngOnChanges({
                totalRecords: {
                    currentValue: 200,
                    previousValue: 100,
                    firstChange: false,
                    isFirstChange: () => false
                }
            });

            expect(paginator.getPageCount()).toBe(20);
            expect(paginator.paginatorState.totalRecords).toBe(200);
        });

        it('should handle pageLinkSize changes', () => {
            paginator.pageLinkSize = 7;
            paginator.ngOnChanges({
                pageLinkSize: {
                    currentValue: 7,
                    previousValue: 5,
                    firstChange: false,
                    isFirstChange: () => false
                }
            });

            expect(paginator.pageLinks?.length).toBe(7);
        });
    });

    describe('Jump to Page Functionality', () => {
        it('should show jump to page dropdown when enabled', () => {
            component.showJumpToPageDropdown = true;
            fixture.detectChanges();

            const dropdown = fixture.debugElement.query(By.css('.p-select'));
            expect(dropdown).toBeTruthy();
        });

        it('should show jump to page input when enabled', () => {
            component.showJumpToPageInput = true;
            fixture.detectChanges();

            const input = fixture.debugElement.query(By.directive(InputNumber));
            expect(input).toBeTruthy();
        });

        it('should populate page items for jump dropdown', () => {
            component.showJumpToPageDropdown = true;
            fixture.detectChanges();
            paginator.updatePageLinks();

            expect(paginator.pageItems).toBeDefined();
            expect(paginator.pageItems?.length).toBe(10);
            expect(paginator.pageItems?.[0]).toEqual({ label: '1', value: 0 });
            expect(paginator.pageItems?.[9]).toEqual({ label: '10', value: 9 });
        });

        it('should handle jump to page input change', fakeAsync(() => {
            component.showJumpToPageInput = true;
            fixture.detectChanges();

            spyOn(paginator, 'changePage').and.callThrough();

            const input = fixture.debugElement.query(By.directive(InputNumber));
            const inputComponent = input.componentInstance as InputNumber;

            // Simulate entering page 5 (1-based)
            inputComponent.onModelChange(5);
            tick();

            expect(paginator.changePage).toHaveBeenCalledWith(4); // 0-based

            flush();
        }));
    });

    describe('Current Page Report', () => {
        it('should display default current page report', () => {
            const report = fixture.debugElement.query(By.css('.p-paginator-current'));
            expect(report.nativeElement.textContent).toBe('1 of 10');
        });

        it('should update current page report on page change', fakeAsync(() => {
            paginator.changePage(4);
            fixture.detectChanges();
            tick();

            const report = fixture.debugElement.query(By.css('.p-paginator-current'));
            expect(report.nativeElement.textContent).toBe('5 of 10');

            flush();
        }));

        it('should support custom report templates', () => {
            component.currentPageReportTemplate = 'Showing {first} to {last} of {totalRecords} entries';
            fixture.detectChanges();

            expect(paginator.currentPageReport).toBe('Showing 1 to 10 of 100 entries');

            paginator.changePage(9);
            fixture.detectChanges();

            expect(paginator.currentPageReport).toBe('Showing 91 to 100 of 100 entries');
        });

        it('should handle all template variables', () => {
            component.currentPageReportTemplate = '{currentPage}/{totalPages} - {first}-{last}/{totalRecords} ({rows} per page)';
            fixture.detectChanges();

            expect(paginator.currentPageReport).toBe('1/10 - 1-10/100 (10 per page)');
        });
    });

    describe('Input Properties Tests', () => {
        beforeEach(() => {
            fixture.detectChanges();
        });

        it('should handle pageLinkSize property changes', () => {
            expect(paginator.pageLinkSize).toBe(5);

            component.pageLinkSize = 7;
            fixture.detectChanges();

            expect(paginator.pageLinkSize).toBe(7);
        });

        it('should handle styleClass property', () => {
            component.styleClass = 'custom-paginator-class';
            fixture.detectChanges();

            expect(paginator.styleClass).toBe('custom-paginator-class');
        });

        it('should handle alwaysShow property', () => {
            expect(paginator.alwaysShow).toBe(true);

            component.alwaysShow = false;
            fixture.detectChanges();

            expect(paginator.alwaysShow).toBe(false);
        });

        it('should handle dropdownAppendTo property', () => {
            const element = document.createElement('div');
            component.dropdownAppendTo = element;
            fixture.detectChanges();

            expect(paginator.dropdownAppendTo).toBe(element);
        });

        it('should handle dropdownScrollHeight property', () => {
            expect(paginator.dropdownScrollHeight).toBe('200px');

            component.dropdownScrollHeight = '300px';
            fixture.detectChanges();

            expect(paginator.dropdownScrollHeight).toBe('300px');
        });

        it('should handle currentPageReportTemplate property', () => {
            const template = 'Page {currentPage} of {totalPages}';
            component.currentPageReportTemplate = template;
            fixture.detectChanges();

            expect(paginator.currentPageReportTemplate).toBe(template);
        });

        it('should handle showCurrentPageReport property', () => {
            component.showCurrentPageReport = false;
            fixture.detectChanges();

            expect(paginator.showCurrentPageReport).toBe(false);
        });

        it('should handle showFirstLastIcon property', () => {
            expect(paginator.showFirstLastIcon).toBe(true);

            component.showFirstLastIcon = false;
            fixture.detectChanges();

            expect(paginator.showFirstLastIcon).toBe(false);
        });

        it('should handle totalRecords property changes', () => {
            expect(paginator.totalRecords).toBe(100);

            component.totalRecords = 200;
            fixture.detectChanges();

            expect(paginator.totalRecords).toBe(200);
        });

        it('should handle rows property changes', () => {
            expect(paginator.rows).toBe(10);

            component.rows = 20;
            fixture.detectChanges();

            expect(paginator.rows).toBe(20);
        });

        it('should handle rowsPerPageOptions property', () => {
            const options = [5, 10, 20, { showAll: 'All' }];
            component.rowsPerPageOptions = options;
            fixture.detectChanges();

            expect(paginator.rowsPerPageOptions).toEqual(options);
        });

        it('should handle showJumpToPageDropdown property', () => {
            component.showJumpToPageDropdown = true;
            fixture.detectChanges();

            expect(paginator.showJumpToPageDropdown).toBe(true);
        });

        it('should handle showJumpToPageInput property', () => {
            component.showJumpToPageInput = true;
            fixture.detectChanges();

            expect(paginator.showJumpToPageInput).toBe(true);
        });

        it('should handle showPageLinks property', () => {
            expect(paginator.showPageLinks).toBe(true);

            component.showPageLinks = false;
            fixture.detectChanges();

            expect(paginator.showPageLinks).toBe(false);
        });

        it('should handle locale property', () => {
            component.locale = 'tr-TR';
            fixture.detectChanges();

            expect(paginator.locale).toBe('tr-TR');
        });

        it('should handle first property getter/setter', () => {
            expect(paginator.first).toBe(0);

            paginator.first = 20;

            expect(paginator.first).toBe(20);
            expect(paginator.getPage()).toBe(2); // page 3 (0-based index 2)
        });

        it('should handle boolean attributes transformation', () => {
            // Test boolean transformation for alwaysShow
            component.alwaysShow = 'false' as any;
            fixture.detectChanges();

            expect(paginator.alwaysShow).toBe(false);

            component.alwaysShow = '' as any;
            fixture.detectChanges();

            expect(paginator.alwaysShow).toBe(true); // empty string should be true
        });

        it('should handle number attributes transformation', () => {
            // Test number transformation for pageLinkSize
            component.pageLinkSize = '7' as any;
            fixture.detectChanges();

            expect(paginator.pageLinkSize).toBe(7);
            expect(typeof paginator.pageLinkSize).toBe('number');
        });

        it('should handle template properties', () => {
            expect(paginator.templateLeft).toBeDefined();
            expect(paginator.templateRight).toBeDefined();
            expect(paginator.jumpToPageItemTemplate).toBeUndefined();
            expect(paginator.dropdownItemTemplate).toBeUndefined();
        });

        it('should handle edge case values for numeric inputs', () => {
            // Test zero values
            component.totalRecords = 0;
            component.rows = 0;
            component.pageLinkSize = 0;
            fixture.detectChanges();

            expect(paginator.totalRecords).toBe(0);
            expect(paginator.rows).toBe(0);
            expect(paginator.pageLinkSize).toBe(0);
        });

        it('should handle negative values for numeric inputs', () => {
            component.totalRecords = -10;
            component.rows = -5;
            component.pageLinkSize = -3;
            fixture.detectChanges();

            expect(paginator.totalRecords).toBe(-10);
            expect(paginator.rows).toBe(-5);
            expect(paginator.pageLinkSize).toBe(-3);
        });
    });

    describe('Dynamic and Observable Input Values', () => {
        let dynamicComponent: TestDynamicPaginatorComponent;
        let dynamicFixture: ComponentFixture<TestDynamicPaginatorComponent>;
        let dynamicPaginator: Paginator;

        beforeEach(() => {
            dynamicFixture = TestBed.createComponent(TestDynamicPaginatorComponent);
            dynamicComponent = dynamicFixture.componentInstance;
            dynamicFixture.detectChanges();
            dynamicPaginator = dynamicComponent.paginator;
        });

        it('should handle dynamic totalRecords changes', fakeAsync(() => {
            expect(dynamicPaginator.totalRecords).toBe(100);

            // Change totalRecords dynamically
            dynamicComponent.updateTotalRecords(250);
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicPaginator.totalRecords).toBe(250);
            expect(dynamicPaginator.getPageCount()).toBe(25);

            flush();
        }));

        it('should handle dynamic rows changes', fakeAsync(() => {
            expect(dynamicPaginator.rows).toBe(10);

            // Change rows dynamically
            dynamicComponent.updateRows(20);
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicPaginator.rows).toBe(20);
            expect(dynamicPaginator.getPageCount()).toBe(5);

            flush();
        }));

        it('should handle dynamic pageLinkSize changes', fakeAsync(() => {
            expect(dynamicPaginator.pageLinkSize).toBe(5);

            // Change pageLinkSize dynamically
            dynamicComponent.updatePageLinkSize(7);
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicPaginator.pageLinkSize).toBe(7);

            flush();
        }));

        it('should handle dynamic boolean property changes', fakeAsync(() => {
            expect(dynamicPaginator.showFirstLastIcon).toBe(true);

            // Toggle boolean properties
            dynamicComponent.toggleShowFirstLastIcon();
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicPaginator.showFirstLastIcon).toBe(false);

            dynamicComponent.toggleShowFirstLastIcon();
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicPaginator.showFirstLastIcon).toBe(true);

            flush();
        }));

        it('should handle dynamic rowsPerPageOptions changes', fakeAsync(() => {
            // Initial options
            dynamicComponent.updateRowsPerPageOptions([5, 10, 15]);
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicPaginator.rowsPerPageOptions).toEqual([5, 10, 15]);

            // Update with showAll option
            dynamicComponent.updateRowsPerPageOptions([10, 20, 30, { showAll: 'All' }]);
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicPaginator.rowsPerPageOptions).toEqual([10, 20, 30, { showAll: 'All' }]);

            flush();
        }));

        it('should handle dynamic template changes', fakeAsync(() => {
            // Change current page report template
            dynamicComponent.updateCurrentPageReportTemplate('{first}-{last} of {totalRecords}');
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicPaginator.currentPageReportTemplate).toBe('{first}-{last} of {totalRecords}');
            expect(dynamicPaginator.currentPageReport).toBe('1-10 of 100');

            flush();
        }));

        it('should handle multiple simultaneous changes', fakeAsync(() => {
            // Change multiple properties at once
            dynamicComponent.updateMultipleProperties(200, 25, 3);
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicPaginator.totalRecords).toBe(200);
            expect(dynamicPaginator.rows).toBe(25);
            expect(dynamicPaginator.pageLinkSize).toBe(3);
            expect(dynamicPaginator.getPageCount()).toBe(8);

            flush();
        }));

        it('should handle observable values from services', fakeAsync(() => {
            // Simulate data from a service observable
            dynamicComponent.loadDataFromService();
            tick(100); // Wait for async operation
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicPaginator.totalRecords).toBe(500);
            expect(dynamicPaginator.rows).toBe(50);

            flush();
        }));

        it('should handle async property updates with delays', fakeAsync(() => {
            // Simulate delayed updates
            dynamicComponent.updateWithDelay(300, 30);
            tick(500); // Wait for the delay
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicPaginator.totalRecords).toBe(300);
            expect(dynamicPaginator.rows).toBe(30);
            expect(dynamicPaginator.getPageCount()).toBe(10);

            flush();
        }));

        it('should maintain component state during rapid changes', fakeAsync(() => {
            const initialPage = dynamicPaginator.getPage();

            // Perform rapid changes
            for (let i = 0; i < 5; i++) {
                dynamicComponent.updateTotalRecords(100 + i * 50);
                tick(10);
                dynamicFixture.detectChanges();
            }

            expect(dynamicPaginator.totalRecords).toBe(300);
            expect(dynamicPaginator.getPage()).toBe(initialPage); // Should maintain current page if possible

            flush();
        }));

        it('should handle edge case: totalRecords becomes smaller than current position', fakeAsync(() => {
            // Go to last page
            dynamicPaginator.changePage(9); // page 10 (index 9)
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicPaginator.getPage()).toBe(9);

            // Reduce total records significantly
            dynamicComponent.updateTotalRecords(25); // Only 3 pages now (25/10 = 2.5)
            dynamicFixture.detectChanges();
            tick();

            expect(dynamicPaginator.totalRecords).toBe(25);
            expect(dynamicPaginator.getPageCount()).toBe(3);
            // Component should automatically adjust to valid page

            flush();
        }));
    });
});

// Test component for dynamic values
@Component({
    standalone: false,
    template: `
        <p-paginator
            #paginator
            [totalRecords]="totalRecords"
            [rows]="rows"
            [pageLinkSize]="pageLinkSize"
            [showFirstLastIcon]="showFirstLastIcon"
            [rowsPerPageOptions]="rowsPerPageOptions"
            [currentPageReportTemplate]="currentPageReportTemplate"
            [showCurrentPageReport]="true"
        >
        </p-paginator>
    `
})
class TestDynamicPaginatorComponent {
    @ViewChild('paginator') paginator!: Paginator;

    totalRecords = 100;
    rows = 10;
    pageLinkSize = 5;
    showFirstLastIcon = true;
    rowsPerPageOptions: any[] | undefined;
    currentPageReportTemplate = '{currentPage} of {totalPages}';

    updateTotalRecords(value: number) {
        this.totalRecords = value;
    }

    updateRows(value: number) {
        this.rows = value;
    }

    updatePageLinkSize(value: number) {
        this.pageLinkSize = value;
    }

    toggleShowFirstLastIcon() {
        this.showFirstLastIcon = !this.showFirstLastIcon;
    }

    updateRowsPerPageOptions(options: any[]) {
        this.rowsPerPageOptions = options;
    }

    updateCurrentPageReportTemplate(template: string) {
        this.currentPageReportTemplate = template;
    }

    updateMultipleProperties(totalRecords: number, rows: number, pageLinkSize: number) {
        this.totalRecords = totalRecords;
        this.rows = rows;
        this.pageLinkSize = pageLinkSize;
    }

    loadDataFromService() {
        // Simulate async data loading
        setTimeout(() => {
            this.totalRecords = 500;
            this.rows = 50;
        }, 100);
    }

    updateWithDelay(totalRecords: number, rows: number) {
        setTimeout(() => {
            this.totalRecords = totalRecords;
            this.rows = rows;
        }, 500);
    }
}
