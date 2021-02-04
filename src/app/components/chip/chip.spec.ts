import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Chip, ChipModule } from './chip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Chip', () => {

	let button: Chip;
	let fixture: ComponentFixture<Chip>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NoopAnimationsModule
			],
			declarations: [
				ChipModule
			]
		});

		fixture = TestBed.createComponent(Chip);
		button = fixture.componentInstance;
	});
});
