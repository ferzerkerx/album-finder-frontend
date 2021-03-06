import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Album } from './Album';
import { Artist } from './Artist';
import { HttpClient, HttpParams } from '@angular/common/http';
import { checkForErrors, parseResponse, url } from './service.util';

@Injectable()
export class AlbumService {
  constructor(private readonly http: HttpClient) {}

  listArtistByName(artistName: string): Observable<Artist[]> {
    const params: HttpParams = new HttpParams().set('name', artistName);
    return this.http
      .get<Artist[]>(url('artist/search'), { params })
      .let(parseResponse);
  }

  deleteArtist(id: number): Observable<any> {
    return this.http.delete<any>(url(`admin/artist/${id}`)).let(checkForErrors);
  }

  deleteAlbum(id: number): Observable<any> {
    return this.http.delete<any>(url(`admin/album/${id}`)).let(checkForErrors);
  }

  listAlbumsByCriteria(searchCriteria: {
    title: string;
    year: string;
  }): Observable<Album[]> {
    const params: HttpParams = new HttpParams()
      .set('title', searchCriteria.title)
      .set('year', searchCriteria.year);

    return this.http
      .get<Artist[]>(url('albums/search'), { params })
      .let(parseResponse);
  }

  saveArtist(artist: Artist): Observable<Artist> {
    const isExistingArtist: boolean = artist.id && artist.id > 0;
    if (isExistingArtist) {
      return this.http
        .put<number>(url(`admin/artist/${artist.id}`), artist)
        .let(parseResponse);
    } else {
      return this.http
        .post<number>(url(`admin/artist`), artist)
        .let(parseResponse);
    }
  }

  saveAlbum(album: Album): Observable<Album> {
    const isExistingAlbum: boolean = album.id && album.id > 0;
    if (isExistingAlbum) {
      return this.http
        .put<Album>(url(`admin/album/${album.id}`), album)
        .let(parseResponse);
    } else {
      return this.http
        .post<Album>(url(`admin/artist/${album.artist.id}/album`), album)
        .let(parseResponse);
    }
  }
}
