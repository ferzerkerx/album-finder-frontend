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
export const checkForErrors = pipe(catchError(handleError));

function _responseData<T>(observable: Observable<T>) {
  return observable
    .filter(value => value && value['data'])
    .map(value => value['data']);
}

export function handleError(error: HttpErrorResponse) {
  const isClientSideError = error.error instanceof ErrorEvent;
  if (isClientSideError) {
    console.error('An error occurred:', error.error.message);
  } else {
    console.error(
      `Backend returned code ${error.status}, body was: ${error.error}`
    );
  }
  return new ErrorObservable('Something bad happened; please try again later.');
}
