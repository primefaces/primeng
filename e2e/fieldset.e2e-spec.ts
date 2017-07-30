import {browser, by, element, ElementFinder, ElementArrayFinder} from 'protractor';

describe('Fieldset', () => {
    let legend: ElementFinder;
    let contentWrapper: ElementArrayFinder;
    
    describe('Toggle Icon Click', () => {
        beforeEach(() => {
          browser.get('#/fieldset');
          legend = element(by.css('.ui-fieldset-toggleable .ui-fieldset-legend'));
          contentWrapper = element.all(by.css('.ui-fieldset-content-wrapper'));
        });

        it('should close active content', () => {
            legend.click();
            expect(contentWrapper.get(1).getCssValue('overflow')).toBe('hidden');
        });
        
        it('should toggle content', () => {
            legend.click();
            browser.sleep(1000);
            legend.click();
            expect(contentWrapper.get(1).getCssValue('height')).not.toBe('0');
        });
        
    });
});