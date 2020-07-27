import { Component, ViewChild, OnInit } from '@angular/core';
import { visibleService } from '../service/ad.service' 
import {AdFormComponent} from '../ad-form/ad-form.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
	@ViewChild(AdFormComponent) childComponent: AdFormComponent;
	constructor(private visibleService: visibleService) 
    {

    }
	visibility: Boolean=false;
	displayAddad: string = 'flex';
  title = 'Задание: Доска объявлений';
  home(){
    
  }

  toggle()
  {
  	this.visibility = this.visibleService.toggle();
  }

  ngOnInit(): void {
  }

}
