import { Injectable, Inject } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Observable, of } from 'rxjs';
import { delay, map, catchError, mergeMap, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(
   private restangular: Restangular,
    private processHTTPMsgService: ProcessHTTPMsgService,
   ) { }

    getPromotions(): Observable<Promotion[]> {
      return this.restangular.all('promotions').getList();
    }
  
    getPromotion(id: number): Observable<Promotion> {
      return this.restangular.one('promotions/', id).get();
    }
  
    getFeaturedPromotion(): Observable<Promotion> {
      return this.restangular.all('promotions').getList({featured: true})
      .pipe(map(promotions => promotions[0]));
    }
}