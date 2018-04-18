import { HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { pipe } from 'rxjs/Rx';
import { environment } from '../environments/environment';

export const url = path => {
  return `${environment.apiUrl}/${path}`;
};

export const parseResponse = pipe(catchError(handleError), _responseData);

function _responseData<T>(observable: Observable<T>) {
  return observable
    .filter(value => value && value['data'])
    .map(value => value['data']);
}

//TODO refine
export function handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` + `body was: ${error.error}`
    );
  }
  // return an ErrorObservable with a user-facing error message
  return new ErrorObservable('Something bad happened; please try again later.');
}
