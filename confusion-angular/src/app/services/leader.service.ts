import { Injectable, Inject } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable, of } from 'rxjs';
import { delay, map, catchError, mergeMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { RestangularModule , Restangular } from 'ngx-restangular';


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

constructor(private restangular: Restangular,
  private processHTTPMsgService: ProcessHTTPMsgService
  ) { }

  getLeaders(): Observable<Leader[]> {
    return this.restangular.all('leaders').getList();
  }

  getLeader(id: number): Observable<Leader> {
    return this.restangular.one('leaders', id);
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.restangular.all('leaders').getList({featured: true}).pipe(map(leaders => leaders[0]));
  }

}
