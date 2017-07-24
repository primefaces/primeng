import {browser, by, element} from 'protractor';

describe('InputText', () => {
      describe('Attribute Value', () => {
        let inputEl = element(by.id('input'));
        let spanEl = element(by.id('text'));
        
        beforeEach(() => {
          browser.get('#/inputtext');
        });

        it('should be displayed in the span element', () => {
            inputEl.sendKeys('PrimeNG Rocks');
            expect(spanEl.getText()).toBe('PrimeNG Rocks');
        });
    });
  
    describe('Disabled property', () => {
        let disabledInput = element(by.id('disabled-input'));
        let disableBtn = element(by.id('disabled-btn'));
        
        beforeEach(() => {
          browser.get('#/inputtext');
        });

        it('should prevent click handlers from executing when disabled', () => {
            expect(disabledInput.isEnabled()).toBe(false);
        });
        it('should become enabled with button click', () => {
            disableBtn.click();
            expect(disabledInput.isEnabled()).toBe(true);
        });
    });
});