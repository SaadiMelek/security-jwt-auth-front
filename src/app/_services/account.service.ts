import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/account/';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getCurrentUserAccounts(): Observable<any> {
    return this.http.get(API_URL + 'all', {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  getAccountTransactionsHistory(id: number): Observable<any> {
		return this.http.get(API_URL + 'history/' + id, {headers: {"Content-Type":"application/json; charset=UTF-8"}});
	}
}
