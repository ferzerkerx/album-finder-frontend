import { TestBed, inject } from '@angular/core/testing';

import { AlbumServiceService } from './album-service.service';

describe('AlbumServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlbumServiceService]
    });
  });

  it('should be created', inject([AlbumServiceService], (service: AlbumServiceService) => {
    expect(service).toBeTruthy();
  }));
});
