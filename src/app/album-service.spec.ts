import { TestBed } from '@angular/core/testing';

import { AlbumService } from './album.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Artist } from './Artist';
import { Album } from './Album';

describe('AlbumService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let albumService: AlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlbumService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    albumService = TestBed.get(AlbumService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#listArtistByName', () => {
    let expectedArtists: Artist[];

    beforeEach(() => {
      albumService = TestBed.get(AlbumService);
      expectedArtists = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' }
      ] as Artist[];
    });

    it('should list artistByName', () => {
      albumService.listArtistByName('somename').subscribe(artists => {
        expect(artists).toEqual(expectedArtists);
      });

      const req = httpTestingController.expectOne(
        (req: HttpRequest<any>) =>
          req.method === 'GET' &&
          req.url === 'http://localhost:8080/artist/search'
      );
      expect(req.request.params.get('name')).toEqual('somename');

      req.flush(expectedArtists);
    });
  });

  describe('#listAlbumsByCriteria', () => {
    let expectedAlbums: Album[];

    beforeEach(() => {
      albumService = TestBed.get(AlbumService);
      expectedAlbums = [
        { id: 1, title: 'A', year: '2014', artist: new Artist() },
        { id: 2, title: 'B', year: '2018', artist: new Artist() }
      ] as Album[];
    });

    it('should list artistByName', () => {
      albumService
        .listAlbumsByCriteria({ title: 'someTitle', year: '2020' })
        .subscribe(albums => {
          expect(albums).toEqual(expectedAlbums);
        });

      const req = httpTestingController.expectOne(
        (req: HttpRequest<any>) =>
          req.method === 'GET' &&
          req.url === 'http://localhost:8080/albums/search'
      );
      expect(req.request.params.get('title')).toEqual('someTitle');
      expect(req.request.params.get('year')).toEqual('2020');

      req.flush(expectedAlbums);
    });
  });
});
