import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getTripList() {
    return this.http.get(this.BASE_URL + '/trip');
  }

  getSpotList(tripId) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('trip_id', tripId);

    return this.http.get(this.BASE_URL + '/spot', {params : httpParams});
  }
}
