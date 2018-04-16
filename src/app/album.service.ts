import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Album } from './Album';
import { Artist } from './Artist';
import {HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor} from '@angular/common/http';
import { parseResponse, url } from './service.util';
import {RequestOptions} from "@angular/http";

@Injectable()
//TODO this should be the real thing
export class AlbumService {
  constructor(private http: HttpClient, private tokenExtractor: HttpXsrfTokenExtractor) {}

  listArtistByName(artistName: string): Observable<Artist[]> {
    const params = new HttpParams().set('name', artistName);
    return this.http
      .get<Artist[]>(url('artist/search'), { params })
      .let(parseResponse);
  }

  deleteArtist(id: number): Promise<number> {
    return this.http
      .delete<number>(url(`admin/artist/${id}`), {withCredentials: true})
      .let(parseResponse).toPromise();
  }

  deleteAlbum(id: number): Promise<number> {
    return Promise.resolve(1);
  }

  listAlbumsByCriteria(searchCriteria: {
    title: String;
    year: String;
  }): Observable<Album[]> {
    const newVar: Album[] = [
      { id: 1, title: 'someTitle', year: '2009', artist: new Artist() }
    ];
    return of(newVar);
  }

  saveArtist(artist: Artist): Promise<number> {
    console.log(`saving artist ${JSON.stringify(artist)}`);
    const token = this.tokenExtractor.getToken() as string;
    console.log(`token ${token}`);
    //https://stackoverflow.com/questions/48002670/angular-5-unable-to-get-xsrf-token-from-httpxsrftokenextractor need to setup the proxy
    return this.http
      .post<number>(url(`admin/artist`), artist, {withCredentials:true, headers: new HttpHeaders().set('X-XSRF-TOKEN', token)})
      .let(parseResponse).toPromise();
  }

  saveAlbum(album: Album): Promise<number> {
    console.log(`saving album ${JSON.stringify(album)}`);
    return Promise.resolve(1);
  }
}
