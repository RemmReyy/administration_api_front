import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ExampleDatapoint} from '../interfaces/example-datapoint';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeopleDemoService {
  private http = inject(HttpClient);

  getPeople(): Observable<HttpResponse<ExampleDatapoint[]>> {
    return this.http.get<ExampleDatapoint[]>(environment.apiEndpoint + '/api/people', {
      observe: 'response',
      withCredentials: true
    });
  }
}
