import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Avatar } from './avatar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Avatar', () => {

	let button: Avatar;
	let fixture: ComponentFixture<Avatar>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NoopAnimationsModule
			],
			declarations: [
				Avatar
			]
		});

		fixture = TestBed.createComponent(Avatar);
		button = fixture.componentInstance;
	});
});
