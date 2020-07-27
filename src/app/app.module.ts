import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule  }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';

import { adService, visibleService } from './service/ad.service'
import { AppComponent } from './app.component';
import { AdListComponent } from './ad-list/ad-list.component';
import { AdComponent } from './ad/ad.component';
import { AdFormComponent } from './ad-form/ad-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';




const appRoutes: Routes =[
    { path: '', component: HomeComponent},
    { path: 'ad/:id', component: AdComponent},
    { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AdListComponent,
    AdComponent,
    AdFormComponent,
    NotFoundComponent,
    HomeComponent,    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [adService, visibleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
