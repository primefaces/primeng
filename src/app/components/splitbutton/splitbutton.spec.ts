import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SplitButton } from './splitbutton';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuItem } from 'primeng/api';

describe('SplitButton', () => {

    let splitbutton: SplitButton;
    let fixture: ComponentFixture<SplitButton>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule,
          RouterTestingModule,
          ButtonModule
        ],
        declarations: [
          SplitButton,
        ],
      });

      fixture = TestBed.createComponent(SplitButton);
      splitbutton = fixture.componentInstance;
    });

    it('should accept readonly options', () => {
        const models : MenuItem[] = [
            {label:'home', url:'https://www.primefaces.org/primeng/'},
            {label:'split-button', url:'https://www.primefaces.org/primeng/#/splitbutton'}
        ];
        splitbutton.model = models;
    });
});
