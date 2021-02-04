import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Tag, TagModule } from './tag';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Tag', () => {

	let tag: Tag;
	let fixture: ComponentFixture<Tag>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				NoopAnimationsModule
			],
			declarations: [
				TagModule
			]
		});

		fixture = TestBed.createComponent(Tag);
		tag = fixture.componentInstance;
	});
});
