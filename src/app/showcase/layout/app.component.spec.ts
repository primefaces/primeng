import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppConfigService } from '@service/appconfigservice';
import { AppConfiguratorComponent } from './configurator/app.configurator.component';
import { AppFooterComponent } from './footer/app.footer.component';
import { AppMenuComponent } from './menu/app.menu.component';
import { AppTopBarComponent } from './topbar/app.topbar.component';
import { JsonService } from '@service/jsonservice';
import { AutoCompleteModule } from 'primeng/autocomplete';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, FormsModule, BrowserAnimationsModule, AutoCompleteModule, HttpClientModule],
            declarations: [
                AppComponent,
                AppConfiguratorComponent,
                AppTopBarComponent,
                AppMenuComponent,
                AppFooterComponent,
            ],
            providers: [JsonService, AppConfigService],
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
