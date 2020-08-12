import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from '../components/autocomplete/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppConfigComponent } from './app.config.component';
import { VersionService } from './service/versionservice';
import { AppConfigService } from './service/appconfigservice';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				FormsModule,
				BrowserAnimationsModule,
				AutoCompleteModule,
				HttpClientModule
			],
			declarations: [AppComponent, AppConfigComponent],
			providers: [VersionService, AppConfigService]
		}).compileComponents();
	}));

	it('should create the app', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));
});
