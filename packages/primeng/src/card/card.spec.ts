import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Card, CardModule } from './card';
import { PrimeTemplate } from 'primeng/api';

@Component({
    standalone: false,
    template: `<p-card></p-card>`
})
class TestBasicCardComponent {}

@Component({
    standalone: false,
    template: `
        <p-card [header]="header" [subheader]="subheader" [styleClass]="styleClass" [style]="style">
            <div class="card-content">Custom Card Content</div>
        </p-card>
    `
})
class TestCustomCardComponent {
    header: string | undefined;
    subheader: string | undefined;
    styleClass: string | undefined;
    style: { [key: string]: any } | undefined;
}

@Component({
    standalone: false,
    template: `
        <p-card>
            <ng-template pTemplate="header">
                <div class="custom-header">Custom Header Template</div>
            </ng-template>
            <ng-template pTemplate="title">
                <h2 class="custom-title">Custom Title Template</h2>
            </ng-template>
            <ng-template pTemplate="subtitle">
                <p class="custom-subtitle">Custom Subtitle Template</p>
            </ng-template>
            <ng-template pTemplate="content">
                <div class="custom-content">Custom Content Template</div>
            </ng-template>
            <ng-template pTemplate="footer">
                <div class="custom-footer">Custom Footer Template</div>
            </ng-template>
        </p-card>
    `
})
class TestTemplateCardComponent {}

@Component({
    standalone: false,
    template: `
        <p-card>
            <p-header>
                <div class="facet-header">Header Facet Content</div>
            </p-header>
            <div class="main-content">Main Card Content</div>
            <p-footer>
                <div class="facet-footer">Footer Facet Content</div>
            </p-footer>
        </p-card>
    `
})
class TestFacetCardComponent {}

@Component({
    standalone: false,
    template: `
        <p-card>
            <ng-template #header>
                <div class="contentchild-header">ContentChild Header</div>
            </ng-template>
            <ng-template #title>
                <h3 class="contentchild-title">ContentChild Title</h3>
            </ng-template>
            <ng-template #subtitle>
                <span class="contentchild-subtitle">ContentChild Subtitle</span>
            </ng-template>
            <ng-template #content>
                <div class="contentchild-content">ContentChild Content</div>
            </ng-template>
            <ng-template #footer>
                <div class="contentchild-footer">ContentChild Footer</div>
            </ng-template>
        </p-card>
    `
})
class TestContentChildCardComponent {
    @ViewChild('header') headerTemplate!: TemplateRef<any>;
    @ViewChild('title') titleTemplate!: TemplateRef<any>;
    @ViewChild('subtitle') subtitleTemplate!: TemplateRef<any>;
    @ViewChild('content') contentTemplate!: TemplateRef<any>;
    @ViewChild('footer') footerTemplate!: TemplateRef<any>;
}

@Component({
    standalone: false,
    template: `
        <p-card header="Simple Header" subheader="Simple Subheader">
            <div class="simple-content">Simple card content with just text properties</div>
        </p-card>
    `
})
class TestSimpleTextCardComponent {}

@Component({
    standalone: false,
    template: `
        <p-card [header]="header" [subheader]="subheader">
            <ng-container *ngIf="showContent">
                <div class="dynamic-content">Dynamic Content</div>
            </ng-container>
        </p-card>
    `
})
class TestDynamicCardComponent {
    header = 'Initial Header';
    subheader = 'Initial Subheader';
    showContent = true;
}

@Component({
    standalone: false,
    template: `
        <p-card>
            <ng-template pTemplate="header">
                <div class="header-with-actions">
                    <h3>Card with Actions</h3>
                    <button class="header-action" type="button">Action</button>
                </div>
            </ng-template>
            <div class="complex-content">
                <p>This is a complex card with multiple elements.</p>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            </div>
            <ng-template pTemplate="footer">
                <div class="footer-buttons">
                    <button class="btn-primary" type="button">Save</button>
                    <button class="btn-secondary" type="button">Cancel</button>
                </div>
            </ng-template>
        </p-card>
    `
})
class TestComplexCardComponent {}

@Component({
    standalone: false,
    template: `
        <p-card header="Header Only">
            <div class="header-only-content">Content with header only</div>
        </p-card>
    `
})
class TestHeaderOnlyCardComponent {}

@Component({
    standalone: false,
    template: `
        <p-card subheader="Subheader Only">
            <div class="subheader-only-content">Content with subheader only</div>
        </p-card>
    `
})
class TestSubheaderOnlyCardComponent {}

@Component({
    standalone: false,
    template: `
        <p-card>
            <ng-template pTemplate="footer">
                <div class="footer-only">Footer Only Content</div>
            </ng-template>
            <div class="content-with-footer">Content with footer only</div>
        </p-card>
    `
})
class TestFooterOnlyCardComponent {}

describe('Card', () => {
    let fixture: ComponentFixture<TestBasicCardComponent>;
    let component: TestBasicCardComponent;
    let cardEl: DebugElement;
    let card: Card;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CardModule, NoopAnimationsModule],
            declarations: [
                TestBasicCardComponent,
                TestCustomCardComponent,
                TestTemplateCardComponent,
                TestFacetCardComponent,
                TestContentChildCardComponent,
                TestSimpleTextCardComponent,
                TestDynamicCardComponent,
                TestComplexCardComponent,
                TestHeaderOnlyCardComponent,
                TestSubheaderOnlyCardComponent,
                TestFooterOnlyCardComponent
            ]
        });

        fixture = TestBed.createComponent(TestBasicCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        cardEl = fixture.debugElement.query(By.directive(Card));
        card = cardEl.componentInstance;
    });

    describe('Component Initialization', () => {
        it('should create the component', () => {
            expect(card).toBeTruthy();
        });

        it('should have default values', () => {
            expect(card.header).toBeUndefined();
            expect(card.subheader).toBeUndefined();
            expect(card.styleClass).toBeUndefined();
        });

        it('should have correct host attributes', () => {
            expect(cardEl.nativeElement.getAttribute('data-pc-name')).toBe('card');
        });

        it('should have correct CSS classes', () => {
            expect(cardEl.nativeElement.className).toContain('p-card');
            expect(cardEl.nativeElement.className).toContain('p-component');
        });

        it('should render card body', () => {
            const bodyElement = cardEl.query(By.css('.p-card-body'));
            expect(bodyElement).toBeTruthy();
        });

        it('should render content section', () => {
            const contentElement = cardEl.query(By.css('.p-card-content'));
            expect(contentElement).toBeTruthy();
        });
    });

    describe('Header Property', () => {
        let customFixture: ComponentFixture<TestCustomCardComponent>;
        let customComponent: TestCustomCardComponent;

        beforeEach(() => {
            customFixture = TestBed.createComponent(TestCustomCardComponent);
            customComponent = customFixture.componentInstance;
        });

        it('should not render header section when header is not provided', () => {
            customFixture.detectChanges();
            const headerElement = customFixture.debugElement.query(By.css('.p-card-header'));
            expect(headerElement).toBeFalsy();
        });

        it('should render header when provided', () => {
            customComponent.header = 'Test Header';
            customFixture.detectChanges();

            const titleElement = customFixture.debugElement.query(By.css('.p-card-title'));
            expect(titleElement).toBeTruthy();
            expect(titleElement.nativeElement.textContent.trim()).toBe('Test Header');
        });

        it('should update header dynamically', () => {
            customComponent.header = 'Initial Header';
            customFixture.detectChanges();

            let titleElement = customFixture.debugElement.query(By.css('.p-card-title'));
            expect(titleElement.nativeElement.textContent.trim()).toBe('Initial Header');

            customComponent.header = 'Updated Header';
            customFixture.detectChanges();
            expect(titleElement.nativeElement.textContent.trim()).toBe('Updated Header');
        });

        it('should handle undefined header gracefully', () => {
            customComponent.header = 'Test Header';
            customFixture.detectChanges();

            customComponent.header = undefined as any;
            customFixture.detectChanges();

            const titleElement = customFixture.debugElement.query(By.css('.p-card-title'));
            expect(titleElement).toBeFalsy();
        });
    });

    describe('Subheader Property', () => {
        let customFixture: ComponentFixture<TestCustomCardComponent>;
        let customComponent: TestCustomCardComponent;

        beforeEach(() => {
            customFixture = TestBed.createComponent(TestCustomCardComponent);
            customComponent = customFixture.componentInstance;
        });

        it('should not render subtitle section when subheader is not provided', () => {
            customFixture.detectChanges();
            const subtitleElement = customFixture.debugElement.query(By.css('.p-card-subtitle'));
            expect(subtitleElement).toBeFalsy();
        });

        it('should render subheader when provided', () => {
            customComponent.subheader = 'Test Subheader';
            customFixture.detectChanges();

            const subtitleElement = customFixture.debugElement.query(By.css('.p-card-subtitle'));
            expect(subtitleElement).toBeTruthy();
            expect(subtitleElement.nativeElement.textContent.trim()).toBe('Test Subheader');
        });

        it('should update subheader dynamically', () => {
            customComponent.subheader = 'Initial Subheader';
            customFixture.detectChanges();

            let subtitleElement = customFixture.debugElement.query(By.css('.p-card-subtitle'));
            expect(subtitleElement.nativeElement.textContent.trim()).toBe('Initial Subheader');

            customComponent.subheader = 'Updated Subheader';
            customFixture.detectChanges();
            expect(subtitleElement.nativeElement.textContent.trim()).toBe('Updated Subheader');
        });

        it('should handle undefined subheader gracefully', () => {
            customComponent.subheader = 'Test Subheader';
            customFixture.detectChanges();

            customComponent.subheader = undefined as any;
            customFixture.detectChanges();

            const subtitleElement = customFixture.debugElement.query(By.css('.p-card-subtitle'));
            expect(subtitleElement).toBeFalsy();
        });
    });

    describe('Style Properties', () => {
        let customFixture: ComponentFixture<TestCustomCardComponent>;
        let customComponent: TestCustomCardComponent;

        beforeEach(() => {
            customFixture = TestBed.createComponent(TestCustomCardComponent);
            customComponent = customFixture.componentInstance;
        });

        it('should apply custom style class', () => {
            customComponent.styleClass = 'my-custom-class';
            customFixture.detectChanges();

            const cardElement = customFixture.debugElement.query(By.directive(Card));
            expect(cardElement.nativeElement.className).toContain('my-custom-class');
        });

        it('should apply multiple custom style classes', () => {
            customComponent.styleClass = 'class-one class-two';
            customFixture.detectChanges();

            const cardElement = customFixture.debugElement.query(By.directive(Card));
            expect(cardElement.nativeElement.className).toContain('class-one');
            expect(cardElement.nativeElement.className).toContain('class-two');
        });

        it('should apply inline styles', () => {
            customComponent.style = { width: '300px', height: '200px' };
            customFixture.detectChanges();

            const cardElement = customFixture.debugElement.query(By.directive(Card));
            expect(cardElement.nativeElement.style.width).toBe('300px');
            expect(cardElement.nativeElement.style.height).toBe('200px');
        });

        it('should update styles dynamically', () => {
            customComponent.style = { backgroundColor: 'red' };
            customFixture.detectChanges();

            const cardElement = customFixture.debugElement.query(By.directive(Card));
            expect(cardElement.nativeElement.style.backgroundColor).toBe('red');

            customComponent.style = { backgroundColor: 'blue' };
            customFixture.detectChanges();
            expect(cardElement.nativeElement.style.backgroundColor).toBe('blue');
        });
    });

    describe('Content Projection', () => {
        let customFixture: ComponentFixture<TestCustomCardComponent>;

        beforeEach(() => {
            customFixture = TestBed.createComponent(TestCustomCardComponent);
            customFixture.detectChanges();
        });

        it('should project content correctly', () => {
            const contentElement = customFixture.debugElement.query(By.css('.card-content'));
            expect(contentElement).toBeTruthy();
            expect(contentElement.nativeElement.textContent).toContain('Custom Card Content');
        });

        it('should render content in p-card-content container', () => {
            const contentContainer = customFixture.debugElement.query(By.css('.p-card-content'));
            expect(contentContainer).toBeTruthy();

            const projectedContent = contentContainer.query(By.css('.card-content'));
            expect(projectedContent).toBeTruthy();
        });
    });

    describe('PrimeTemplate Support', () => {
        let templateFixture: ComponentFixture<TestTemplateCardComponent>;

        beforeEach(() => {
            templateFixture = TestBed.createComponent(TestTemplateCardComponent);
            templateFixture.detectChanges();
        });

        it('should render header template', () => {
            const headerElement = templateFixture.debugElement.query(By.css('.p-card-header'));
            expect(headerElement).toBeTruthy();

            const customHeader = headerElement.query(By.css('.custom-header'));
            expect(customHeader).toBeTruthy();
            expect(customHeader.nativeElement.textContent).toBe('Custom Header Template');
        });

        it('should render title template', () => {
            const titleElement = templateFixture.debugElement.query(By.css('.p-card-title'));
            expect(titleElement).toBeTruthy();

            const customTitle = titleElement.query(By.css('.custom-title'));
            expect(customTitle).toBeTruthy();
            expect(customTitle.nativeElement.textContent).toBe('Custom Title Template');
        });

        it('should render subtitle template', () => {
            const subtitleElement = templateFixture.debugElement.query(By.css('.p-card-subtitle'));
            expect(subtitleElement).toBeTruthy();

            const customSubtitle = subtitleElement.query(By.css('.custom-subtitle'));
            expect(customSubtitle).toBeTruthy();
            expect(customSubtitle.nativeElement.textContent).toBe('Custom Subtitle Template');
        });

        it('should render content template', () => {
            const contentElement = templateFixture.debugElement.query(By.css('.p-card-content'));
            expect(contentElement).toBeTruthy();

            const customContent = contentElement.query(By.css('.custom-content'));
            expect(customContent).toBeTruthy();
            expect(customContent.nativeElement.textContent).toBe('Custom Content Template');
        });

        it('should render footer template', () => {
            const footerElement = templateFixture.debugElement.query(By.css('.p-card-footer'));
            expect(footerElement).toBeTruthy();

            const customFooter = footerElement.query(By.css('.custom-footer'));
            expect(customFooter).toBeTruthy();
            expect(customFooter.nativeElement.textContent).toBe('Custom Footer Template');
        });
    });

    describe('Header and Footer Facets', () => {
        let facetFixture: ComponentFixture<TestFacetCardComponent>;

        beforeEach(() => {
            facetFixture = TestBed.createComponent(TestFacetCardComponent);
            facetFixture.detectChanges();
        });

        it('should render header facet', () => {
            const headerElement = facetFixture.debugElement.query(By.css('.p-card-header'));
            expect(headerElement).toBeTruthy();

            const facetHeader = headerElement.query(By.css('.facet-header'));
            expect(facetHeader).toBeTruthy();
            expect(facetHeader.nativeElement.textContent).toBe('Header Facet Content');
        });

        it('should render footer facet', () => {
            const footerElement = facetFixture.debugElement.query(By.css('.p-card-footer'));
            expect(footerElement).toBeTruthy();

            const facetFooter = footerElement.query(By.css('.facet-footer'));
            expect(facetFooter).toBeTruthy();
            expect(facetFooter.nativeElement.textContent).toBe('Footer Facet Content');
        });

        it('should render main content along with facets', () => {
            const contentElement = facetFixture.debugElement.query(By.css('.p-card-content'));
            expect(contentElement).toBeTruthy();

            const mainContent = contentElement.query(By.css('.main-content'));
            expect(mainContent).toBeTruthy();
            expect(mainContent.nativeElement.textContent).toBe('Main Card Content');
        });
    });

    describe('ContentChild Templates', () => {
        let contentChildFixture: ComponentFixture<TestContentChildCardComponent>;
        let contentChildComponent: TestContentChildCardComponent;

        beforeEach(() => {
            contentChildFixture = TestBed.createComponent(TestContentChildCardComponent);
            contentChildComponent = contentChildFixture.componentInstance;
            contentChildFixture.detectChanges();
        });

        it('should render ContentChild header template', () => {
            const headerElement = contentChildFixture.debugElement.query(By.css('.p-card-header'));
            expect(headerElement).toBeTruthy();

            const contentChildHeader = headerElement.query(By.css('.contentchild-header'));
            expect(contentChildHeader).toBeTruthy();
            expect(contentChildHeader.nativeElement.textContent).toBe('ContentChild Header');
        });

        it('should render ContentChild title template', () => {
            const titleElement = contentChildFixture.debugElement.query(By.css('.p-card-title'));
            expect(titleElement).toBeTruthy();

            const contentChildTitle = titleElement.query(By.css('.contentchild-title'));
            expect(contentChildTitle).toBeTruthy();
            expect(contentChildTitle.nativeElement.textContent).toBe('ContentChild Title');
        });

        it('should render ContentChild subtitle template', () => {
            const subtitleElement = contentChildFixture.debugElement.query(By.css('.p-card-subtitle'));
            expect(subtitleElement).toBeTruthy();

            const contentChildSubtitle = subtitleElement.query(By.css('.contentchild-subtitle'));
            expect(contentChildSubtitle).toBeTruthy();
            expect(contentChildSubtitle.nativeElement.textContent).toBe('ContentChild Subtitle');
        });

        it('should render ContentChild content template', () => {
            const contentElement = contentChildFixture.debugElement.query(By.css('.p-card-content'));
            expect(contentElement).toBeTruthy();

            const contentChildContent = contentElement.query(By.css('.contentchild-content'));
            expect(contentChildContent).toBeTruthy();
            expect(contentChildContent.nativeElement.textContent).toBe('ContentChild Content');
        });

        it('should render ContentChild footer template', () => {
            const footerElement = contentChildFixture.debugElement.query(By.css('.p-card-footer'));
            expect(footerElement).toBeTruthy();

            const contentChildFooter = footerElement.query(By.css('.contentchild-footer'));
            expect(contentChildFooter).toBeTruthy();
            expect(contentChildFooter.nativeElement.textContent).toBe('ContentChild Footer');
        });

        it('should have correct template references in component', () => {
            expect(contentChildComponent.headerTemplate).toBeDefined();
            expect(contentChildComponent.titleTemplate).toBeDefined();
            expect(contentChildComponent.subtitleTemplate).toBeDefined();
            expect(contentChildComponent.contentTemplate).toBeDefined();
            expect(contentChildComponent.footerTemplate).toBeDefined();
        });
    });

    describe('Simple Text Properties', () => {
        let simpleFixture: ComponentFixture<TestSimpleTextCardComponent>;

        beforeEach(() => {
            simpleFixture = TestBed.createComponent(TestSimpleTextCardComponent);
            simpleFixture.detectChanges();
        });

        it('should render simple header text', () => {
            const titleElement = simpleFixture.debugElement.query(By.css('.p-card-title'));
            expect(titleElement).toBeTruthy();
            expect(titleElement.nativeElement.textContent.trim()).toBe('Simple Header');
        });

        it('should render simple subheader text', () => {
            const subtitleElement = simpleFixture.debugElement.query(By.css('.p-card-subtitle'));
            expect(subtitleElement).toBeTruthy();
            expect(subtitleElement.nativeElement.textContent.trim()).toBe('Simple Subheader');
        });

        it('should render content with text properties', () => {
            const contentElement = simpleFixture.debugElement.query(By.css('.p-card-content'));
            expect(contentElement).toBeTruthy();

            const simpleContent = contentElement.query(By.css('.simple-content'));
            expect(simpleContent).toBeTruthy();
            expect(simpleContent.nativeElement.textContent).toBe('Simple card content with just text properties');
        });
    });

    describe('Dynamic Content', () => {
        let dynamicFixture: ComponentFixture<TestDynamicCardComponent>;
        let dynamicComponent: TestDynamicCardComponent;

        beforeEach(() => {
            dynamicFixture = TestBed.createComponent(TestDynamicCardComponent);
            dynamicComponent = dynamicFixture.componentInstance;
            dynamicFixture.detectChanges();
        });

        it('should handle dynamic header changes', () => {
            let titleElement = dynamicFixture.debugElement.query(By.css('.p-card-title'));
            expect(titleElement.nativeElement.textContent.trim()).toBe('Initial Header');

            dynamicComponent.header = 'Changed Header';
            dynamicFixture.detectChanges();
            expect(titleElement.nativeElement.textContent.trim()).toBe('Changed Header');
        });

        it('should handle dynamic subheader changes', () => {
            let subtitleElement = dynamicFixture.debugElement.query(By.css('.p-card-subtitle'));
            expect(subtitleElement.nativeElement.textContent.trim()).toBe('Initial Subheader');

            dynamicComponent.subheader = 'Changed Subheader';
            dynamicFixture.detectChanges();
            expect(subtitleElement.nativeElement.textContent.trim()).toBe('Changed Subheader');
        });

        it('should handle dynamic content visibility', () => {
            let dynamicContent = dynamicFixture.debugElement.query(By.css('.dynamic-content'));
            expect(dynamicContent).toBeTruthy();

            dynamicComponent.showContent = false;
            dynamicFixture.detectChanges();
            dynamicContent = dynamicFixture.debugElement.query(By.css('.dynamic-content'));
            expect(dynamicContent).toBeFalsy();

            dynamicComponent.showContent = true;
            dynamicFixture.detectChanges();
            dynamicContent = dynamicFixture.debugElement.query(By.css('.dynamic-content'));
            expect(dynamicContent).toBeTruthy();
        });
    });

    describe('Complex Card Structure', () => {
        let complexFixture: ComponentFixture<TestComplexCardComponent>;

        beforeEach(() => {
            complexFixture = TestBed.createComponent(TestComplexCardComponent);
            complexFixture.detectChanges();
        });

        it('should render complex header with actions', () => {
            const headerElement = complexFixture.debugElement.query(By.css('.p-card-header'));
            expect(headerElement).toBeTruthy();

            const headerActions = headerElement.query(By.css('.header-with-actions'));
            expect(headerActions).toBeTruthy();

            const actionButton = headerActions.query(By.css('.header-action'));
            expect(actionButton).toBeTruthy();
            expect(actionButton.nativeElement.textContent).toBe('Action');
        });

        it('should render complex content with multiple elements', () => {
            const contentElement = complexFixture.debugElement.query(By.css('.p-card-content'));
            expect(contentElement).toBeTruthy();

            const complexContent = contentElement.query(By.css('.complex-content'));
            expect(complexContent).toBeTruthy();

            const listItems = complexContent.queryAll(By.css('li'));
            expect(listItems.length).toBe(3);
        });

        it('should render complex footer with buttons', () => {
            const footerElement = complexFixture.debugElement.query(By.css('.p-card-footer'));
            expect(footerElement).toBeTruthy();

            const footerButtons = footerElement.query(By.css('.footer-buttons'));
            expect(footerButtons).toBeTruthy();

            const buttons = footerButtons.queryAll(By.css('button'));
            expect(buttons.length).toBe(2);
            expect(buttons[0].nativeElement.textContent).toBe('Save');
            expect(buttons[1].nativeElement.textContent).toBe('Cancel');
        });
    });

    describe('Partial Content Scenarios', () => {
        it('should render header only card', () => {
            const headerOnlyFixture = TestBed.createComponent(TestHeaderOnlyCardComponent);
            headerOnlyFixture.detectChanges();

            const titleElement = headerOnlyFixture.debugElement.query(By.css('.p-card-title'));
            expect(titleElement).toBeTruthy();
            expect(titleElement.nativeElement.textContent.trim()).toBe('Header Only');

            const subtitleElement = headerOnlyFixture.debugElement.query(By.css('.p-card-subtitle'));
            expect(subtitleElement).toBeFalsy();

            const footerElement = headerOnlyFixture.debugElement.query(By.css('.p-card-footer'));
            expect(footerElement).toBeFalsy();
        });

        it('should render subheader only card', () => {
            const subheaderOnlyFixture = TestBed.createComponent(TestSubheaderOnlyCardComponent);
            subheaderOnlyFixture.detectChanges();

            const titleElement = subheaderOnlyFixture.debugElement.query(By.css('.p-card-title'));
            expect(titleElement).toBeFalsy();

            const subtitleElement = subheaderOnlyFixture.debugElement.query(By.css('.p-card-subtitle'));
            expect(subtitleElement).toBeTruthy();
            expect(subtitleElement.nativeElement.textContent.trim()).toBe('Subheader Only');

            const footerElement = subheaderOnlyFixture.debugElement.query(By.css('.p-card-footer'));
            expect(footerElement).toBeFalsy();
        });

        it('should render footer only card', () => {
            const footerOnlyFixture = TestBed.createComponent(TestFooterOnlyCardComponent);
            footerOnlyFixture.detectChanges();

            const titleElement = footerOnlyFixture.debugElement.query(By.css('.p-card-title'));
            expect(titleElement).toBeFalsy();

            const subtitleElement = footerOnlyFixture.debugElement.query(By.css('.p-card-subtitle'));
            expect(subtitleElement).toBeFalsy();

            const headerElement = footerOnlyFixture.debugElement.query(By.css('.p-card-header'));
            expect(headerElement).toBeFalsy();

            const footerElement = footerOnlyFixture.debugElement.query(By.css('.p-card-footer'));
            expect(footerElement).toBeTruthy();

            const footerContent = footerElement.query(By.css('.footer-only'));
            expect(footerContent).toBeTruthy();
            expect(footerContent.nativeElement.textContent).toBe('Footer Only Content');
        });
    });

    describe('BlockableUI Interface', () => {
        it('should implement getBlockableElement method', () => {
            expect(typeof card.getBlockableElement).toBe('function');
        });

        it('should return first child element from getBlockableElement', () => {
            const blockableElement = card.getBlockableElement();
            expect(blockableElement).toBeTruthy();
            expect(blockableElement).toBe(cardEl.nativeElement.children[0]);
        });

        it('should return correct blockable element with complex content', () => {
            const complexFixture = TestBed.createComponent(TestComplexCardComponent);
            complexFixture.detectChanges();

            const complexCard = complexFixture.debugElement.query(By.directive(Card)).componentInstance;
            const blockableElement = complexCard.getBlockableElement();

            expect(blockableElement).toBeTruthy();
            expect(blockableElement.parentElement).toBe(complexFixture.debugElement.query(By.directive(Card)).nativeElement);
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should apply base component classes correctly', () => {
            const cardElement = fixture.debugElement.query(By.css('p-card'));
            expect(cardElement.nativeElement.className).toContain('p-card');
            expect(cardElement.nativeElement.className).toContain('p-component');
        });

        it('should apply section classes correctly', () => {
            const templateFixture = TestBed.createComponent(TestTemplateCardComponent);
            templateFixture.detectChanges();

            const headerElement = templateFixture.debugElement.query(By.css('.p-card-header'));
            const bodyElement = templateFixture.debugElement.query(By.css('.p-card-body'));
            const titleElement = templateFixture.debugElement.query(By.css('.p-card-title'));
            const subtitleElement = templateFixture.debugElement.query(By.css('.p-card-subtitle'));
            const contentElement = templateFixture.debugElement.query(By.css('.p-card-content'));
            const footerElement = templateFixture.debugElement.query(By.css('.p-card-footer'));

            expect(headerElement.nativeElement.className).toContain('p-card-header');
            expect(bodyElement.nativeElement.className).toContain('p-card-body');
            expect(titleElement.nativeElement.className).toContain('p-card-title');
            expect(subtitleElement.nativeElement.className).toContain('p-card-subtitle');
            expect(contentElement.nativeElement.className).toContain('p-card-content');
            expect(footerElement.nativeElement.className).toContain('p-card-footer');
        });
    });

    describe('Template Processing', () => {
        it('should process templates after content init', () => {
            const templateFixture = TestBed.createComponent(TestTemplateCardComponent);
            templateFixture.detectChanges();

            const cardInstance = templateFixture.debugElement.query(By.directive(Card)).componentInstance;

            expect(cardInstance._headerTemplate).toBeTruthy();
            expect(cardInstance._titleTemplate).toBeTruthy();
            expect(cardInstance._subtitleTemplate).toBeTruthy();
            expect(cardInstance._contentTemplate).toBeTruthy();
            expect(cardInstance._footerTemplate).toBeTruthy();
        });

        it('should handle templates with ngAfterContentInit lifecycle', () => {
            const templateFixture = TestBed.createComponent(TestTemplateCardComponent);
            templateFixture.detectChanges();

            const cardInstance = templateFixture.debugElement.query(By.directive(Card)).componentInstance;

            spyOn(cardInstance, 'ngAfterContentInit').and.callThrough();

            // Trigger ngAfterContentInit manually
            cardInstance.ngAfterContentInit();

            expect(cardInstance.ngAfterContentInit).toHaveBeenCalled();
        });
    });

    describe('Data Attributes', () => {
        it('should have correct data-pc-name', () => {
            expect(cardEl.nativeElement.getAttribute('data-pc-name')).toBe('card');
        });

        it('should maintain data attributes after property changes', () => {
            const customFixture = TestBed.createComponent(TestCustomCardComponent);
            const customComponent = customFixture.componentInstance;
            customFixture.detectChanges();

            let cardElement = customFixture.debugElement.query(By.directive(Card));
            expect(cardElement.nativeElement.getAttribute('data-pc-name')).toBe('card');

            customComponent.header = 'Changed Header';
            customComponent.styleClass = 'changed-class';
            customFixture.detectChanges();

            expect(cardElement.nativeElement.getAttribute('data-pc-name')).toBe('card');
        });
    });

    describe('Edge Cases', () => {
        it('should handle undefined properties gracefully', () => {
            const customFixture = TestBed.createComponent(TestCustomCardComponent);
            const customComponent = customFixture.componentInstance;

            customComponent.header = undefined as any;
            customComponent.subheader = undefined as any;
            customComponent.styleClass = undefined as any;
            customComponent.style = undefined as any;

            expect(() => customFixture.detectChanges()).not.toThrow();

            const cardElement = customFixture.debugElement.query(By.directive(Card));
            expect(cardElement).toBeTruthy();
        });

        it('should handle rapid property changes', () => {
            const customFixture = TestBed.createComponent(TestCustomCardComponent);
            const customComponent = customFixture.componentInstance;
            customFixture.detectChanges();

            customComponent.header = 'Header 1';
            customComponent.subheader = 'Subheader 1';
            customComponent.styleClass = 'class-1';
            customFixture.detectChanges();

            customComponent.header = 'Header 2';
            customComponent.subheader = 'Subheader 2';
            customComponent.styleClass = 'class-2';
            customFixture.detectChanges();

            const titleElement = customFixture.debugElement.query(By.css('.p-card-title'));
            const subtitleElement = customFixture.debugElement.query(By.css('.p-card-subtitle'));
            const cardElement = customFixture.debugElement.query(By.directive(Card));

            expect(titleElement.nativeElement.textContent.trim()).toBe('Header 2');
            expect(subtitleElement.nativeElement.textContent.trim()).toBe('Subheader 2');
            expect(cardElement.nativeElement.className).toContain('class-2');
        });

        it('should handle empty string values', () => {
            const customFixture = TestBed.createComponent(TestCustomCardComponent);
            const customComponent = customFixture.componentInstance;

            customComponent.header = '';
            customComponent.subheader = '';
            customFixture.detectChanges();

            // Empty strings are falsy values, so title and subtitle elements should not be rendered
            const titleElement = customFixture.debugElement.query(By.css('.p-card-title'));
            const subtitleElement = customFixture.debugElement.query(By.css('.p-card-subtitle'));

            expect(titleElement).toBeFalsy();
            expect(subtitleElement).toBeFalsy();
        });
    });

    describe('Memory Management', () => {
        it('should cleanup on destroy', () => {
            expect(() => {
                fixture.destroy();
            }).not.toThrow();
        });

        it('should cleanup templates on destroy', () => {
            const templateFixture = TestBed.createComponent(TestTemplateCardComponent);
            templateFixture.detectChanges();

            expect(() => {
                templateFixture.destroy();
            }).not.toThrow();
        });

        it('should handle rapid creation and destruction', () => {
            for (let i = 0; i < 5; i++) {
                const testFixture = TestBed.createComponent(TestCustomCardComponent);
                testFixture.detectChanges();
                testFixture.destroy();
            }

            expect(true).toBe(true);
        });

        it('should cleanup complex components', () => {
            const complexFixture = TestBed.createComponent(TestComplexCardComponent);
            complexFixture.detectChanges();

            expect(() => {
                complexFixture.destroy();
            }).not.toThrow();
        });
    });

    describe('Component Integration', () => {
        it('should handle card with all features enabled', () => {
            const templateFixture = TestBed.createComponent(TestTemplateCardComponent);
            templateFixture.detectChanges();

            const cardElement = templateFixture.debugElement.query(By.directive(Card));
            expect(cardElement.nativeElement.children.length).toBeGreaterThan(0);

            const headerElement = templateFixture.debugElement.query(By.css('.p-card-header'));
            const bodyElement = templateFixture.debugElement.query(By.css('.p-card-body'));
            const footerElement = templateFixture.debugElement.query(By.css('.p-card-footer'));

            expect(headerElement).toBeTruthy();
            expect(bodyElement).toBeTruthy();
            expect(footerElement).toBeTruthy();
        });

        it('should maintain card structure with different content types', () => {
            const facetFixture = TestBed.createComponent(TestFacetCardComponent);
            facetFixture.detectChanges();

            const cardElement = facetFixture.debugElement.query(By.directive(Card));
            expect(cardElement.nativeElement.getAttribute('data-pc-name')).toBe('card');

            const bodyElement = facetFixture.debugElement.query(By.css('.p-card-body'));
            expect(bodyElement).toBeTruthy();
        });
    });
});
