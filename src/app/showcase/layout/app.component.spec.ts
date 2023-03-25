import { HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AppConfigService } from '../service/appconfigservice';
import { AppComponent } from './app.component';
import { AppConfigComponent } from './config/app.config.component';
import { AppFooterComponent } from './footer/app.footer.component';
import { AppMenuComponent } from './menu/app.menu.component';
import { AppTopBarComponent } from './topbar/app.topbar.component';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, FormsModule, BrowserAnimationsModule, AutoCompleteModule, HttpClientModule],
            declarations: [AppComponent, AppConfigComponent, AppTopBarComponent, AppMenuComponent, AppFooterComponent],
            providers: [AppConfigService]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
