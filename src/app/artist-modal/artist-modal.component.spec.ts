import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistModalComponent } from './create-artist-modal.component';

describe('CreateArtistModalComponent', () => {
  let component: ArtistModalComponent;
  let fixture: ComponentFixture<ArtistModalComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ArtistModalComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
