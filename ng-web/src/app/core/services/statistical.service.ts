import { Injectable } from '@angular/core';
import { BasicService } from './basic.service';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../../shared/service/helper.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticalService extends BasicService {

  constructor(public httpClient: HttpClient, public helperService: HelperService) {
    super('ess', 'statistical', httpClient, helperService);
  }

  public getPersonAmountByYear(year: any): Observable<any> {
    const url = `${this.serviceUrl}/person/${year}`;
    return this.getRequest(url);
  }

  public getPersonAmountByMonth(year: any,month:any): Observable<any> {
    const url = `${this.serviceUrl}/person/${year}`;
    return this.getRequest(url);
  }
}
