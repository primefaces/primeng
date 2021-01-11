import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CascadeSelect, CascadeSelectModule } from './cascadeselect';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CascadeSelect', () => {

	let tag: CascadeSelect;
	let fixture: ComponentFixture<CascadeSelect>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NoopAnimationsModule
			],
			declarations: [
				CascadeSelectModule
			]
		});

		fixture = TestBed.createComponent(CascadeSelect);
		tag = fixture.componentInstance;
	});
});
