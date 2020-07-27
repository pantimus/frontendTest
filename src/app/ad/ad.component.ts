import { Component, OnInit,  } from '@angular/core';
import { AdListComponent } from '../ad-list/ad-list.component'
import {Ad} from '../model/ad'
import { adService } from '../service/ad.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {
	id: number;
 	singleAd: Ad;
  isLoading: boolean = false;
 	private adList: AdListComponent;
 	constructor(
 	 	private adService: adService, 
    private activateRoute: ActivatedRoute
 	)
  {
     this.id = activateRoute.snapshot.params['id'];
  }
 	private adUpdate;
  
  ngDoCheck()
  {
    //this.setSingleAd();
  }
  ngOnInit(): void {
    this.setSingleAd();
  }
  
  setSingleAd()
  {
  	return this.adService.getSingleAd(this.id).subscribe(singleAd => {
    this.singleAd = singleAd[0];
    setTimeout(()=>{
        this.isLoading = true
        },
        300
    );
    //console.log(this.singleAd.pic);
    });
  }

}
