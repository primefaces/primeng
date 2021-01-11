import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Badge, BadgeModule } from './badge';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Badge', () => {

	let button: Badge;
	let fixture: ComponentFixture<Badge>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NoopAnimationsModule
			],
			declarations: [
				BadgeModule
			]
		});

		fixture = TestBed.createComponent(Badge);
		button = fixture.componentInstance;
	});
});
