import { Component, OnInit } from '@angular/core';
import { Ad } from '../model/ad';
import { adService } from '../service/ad.service';
import { AdFormComponent } from '../ad-form/ad-form.component'

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.scss']
})


export class AdListComponent implements OnInit {
  ad: Ad;
	adsList: Ad[];
  isLoading: boolean = false;
  page_count: number = 1;
  isLastPage: boolean = false;
  isFirstPage: boolean= false;
  lastPage: number;

  constructor(
    private adService: adService,
    
    ) { 

  }
  
  ngOnInit(): void {
  	this.setAd();
    this.lastPageMethod();
  }
  lastPageMethod()
  {
    this.adService.getLastPage().subscribe(lagePast => {
        this.lastPage = lagePast;
        
    });
  }
  ngDoCheck()
  {
    if(this.page_count==1) this.isFirstPage= true;
    else this.isFirstPage=false;
    if(this.page_count==this.lastPage) this.isLastPage = true;
    else this.isLastPage=false;
  }
  gotoFirstPage(){
    this.page_count = 1;
    this.setAd();
  }
  gotoPrevPage(){
    this.page_count--;
    this.setAd();
  }
  gotoNextPage(){
    this.page_count++;
    this.setAd();
  }
  gotoLastPage() // костыль страшный, исправить надо бы
  {
    this.page_count=this.lastPage;
   
    this.setAd();
  }
  setAd(): void
  {
  	this.adService.getAds(this.page_count).subscribe(adsList => {
      this.adsList = adsList;
      setTimeout(()=>{
        this.isLoading = true
        },
        300
      );
      }); 
  }
  /*selectAd(id)
  {
    console.log(id)
  }*/
}


