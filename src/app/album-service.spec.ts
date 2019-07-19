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

  describe('#deleteArtist', () => {
    beforeEach(() => {
      albumService = TestBed.get(AlbumService);
    });

    it('should delete artist', () => {
      albumService.deleteArtist(10).subscribe(() => {});
      const req = httpTestingController.expectOne(
        'http://localhost:8080/admin/artist/10'
      );
      expect(req.request.method).toEqual('DELETE');

      req.flush({});
    });
  });

  describe('#deleteAlbum', () => {
    beforeEach(() => {
      albumService = TestBed.get(AlbumService);
    });

    it('should delete album', () => {
      albumService.deleteAlbum(10).subscribe(() => {});
      const req = httpTestingController.expectOne(
        'http://localhost:8080/admin/album/10'
      );
      expect(req.request.method).toEqual('DELETE');

      req.flush({});
    });
  });

  describe('#saveArtist', () => {
    let artist: Artist;

    beforeEach(() => {
      albumService = TestBed.get(AlbumService);
    });

    it('should save artist', () => {
      artist = { name: 'A' };
      albumService.saveArtist(artist).subscribe(saveArtist => {
        expect(saveArtist.name).toBe(artist.name);
      });
      const req = httpTestingController.expectOne(
        'http://localhost:8080/admin/artist'
      );
      expect(req.request.method).toEqual('POST');

      req.flush(artist);
    });

    it('should update artist', () => {
      artist = { name: 'A', id: 3 };
      albumService.saveArtist(artist).subscribe(saveArtist => {
        expect(saveArtist.name).toBe(artist.name);
      });
      const req = httpTestingController.expectOne(
        'http://localhost:8080/admin/artist/3'
      );
      expect(req.request.method).toEqual('PUT');

      req.flush(artist);
    });
  });

  describe('#saveAlbum', () => {
    let album: Album;

    beforeEach(() => {
      albumService = TestBed.get(AlbumService);
    });

    it('should save album', () => {
      album = new Album({
        id: 0,
        title: 'A',
        year: '2014',
        artist: { id: 2, name: 'theartist' }
      });
      albumService.saveAlbum(album).subscribe(saveArtist => {
        expect(saveArtist.title).toBe(album.title);
      });
      const req = httpTestingController.expectOne(
        'http://localhost:8080/admin/artist/2/album'
      );
      expect(req.request.method).toEqual('POST');

      req.flush(album);
    });

    it('should update album', () => {
      album = new Album({
        id: 10,
        title: 'A',
        year: '2014',
        artist: { id: 2, name: 'theartist' }
      });
      albumService.saveAlbum(album).subscribe(saveArtist => {
        expect(saveArtist.title).toBe(album.title);
      });
      const req = httpTestingController.expectOne(
        'http://localhost:8080/admin/album/10'
      );
      expect(req.request.method).toEqual('PUT');

      req.flush(album);
    });
  });
});
