import { Injectable } from '@angular/core';
import  { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Ad } from '../model/ad';
import { ads } from './ad-data';
import { config } from '../model/config';
import { map,catchError } from 'rxjs/operators';

@Injectable()
export class adService {
  
  constructor(private http: HttpClient) { }
 
  getAds(page_count:number): Observable<[Ad]> {
    //console.log(page_count);
    let answer = this.http.get("http://localhost:4000/"+page_count+"?sort");
    return answer.pipe(map(data=>{
            let usersList = data["ad"];
            let numRow = data["numRow"];
            //let pageNumbers = data["page_numbers"]
            
            return usersList.map(function(ad) {
                return { page_count: numRow, title: ad.ad_title, id: ad.id_ad, pic: ad.ad_pic, data: ad.ad_data};
              });
        }),
        catchError(err =>{
          console.log(err); 
          return err;
        }));
  }
  
  getLastPage(): Observable<number> {
    let answer = this.http.get("http://localhost:4000/");
    return answer.pipe(map(data=>{
            return data["numRow"];            
        }),
        catchError(err =>{
          console.log(err); 
          return err;
        }));
  }

  addAdService(body: any): Observable<any>
  {
    //console.log(body);
    let answer = this.http.post("http://localhost:4000/ad", body)
    return answer.pipe(map(data=>{
            return data["msg"];            
        }),
        catchError(err =>{
          console.log(err.error['msg'])
          return err.error["msg"];
        }));
  }

  getSingleAd(id: number): Observable<Ad>
  {
  	let answer = this.http.get("http://localhost:4000/ad/"+id+"?fields");
    return answer.pipe(map(data=>{
            let singleAd = data["ad"];            
            return singleAd.map(function(ad: any) {
                return { title: ad.ad_title, desc: ad.ad_desc, pic: ad.ad_pic};
              });
        }),
        catchError(err =>{
          console.log(err); 
          return throwError(err);  
        }));
  }
}


var visibility: boolean = false;
@Injectable()
export class visibleService {
	toggle() {
		console.log(visibility);
		visibility = !visibility;
    	return visibility;
  }
}