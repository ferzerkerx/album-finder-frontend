import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArtistModalComponent } from './create-artist-modal.component';

describe('CreateArtistModalComponent', () => {
  let component: CreateArtistModalComponent;
  let fixture: ComponentFixture<CreateArtistModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateArtistModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateArtistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
