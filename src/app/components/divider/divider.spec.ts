import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Divider, DividerModule } from './divider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Divider', () => {

	let divider: Divider;
	let fixture: ComponentFixture<Divider>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NoopAnimationsModule
			],
			declarations: [
				DividerModule
			]
		});

		fixture = TestBed.createComponent(Divider);
		divider = fixture.componentInstance;
	});
});
