import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Ad} from '../model/ad';
import { adService, visibleService } from '../service/ad.service';
import { FormBuilder ,FormControl, FormGroup, Validators }   from '@angular/forms';
import { AppComponent} from '../app.component';

@Component({
  selector: 'app-ad-form',
  templateUrl: './ad-form.component.html',
  styleUrls: ['./ad-form.component.scss']
})



export class AdFormComponent implements OnInit {

  @Output() childEvent = new EventEmitter();

  counter: number = 0;
	ad: Ad = new Ad(null, null, null, null, null);//костыль, нужно исправить если будет время
  adsClass: Ad[]; 
  FormValid: FormGroup;
  msg: string;
  isStatusVisible: boolean = false;
  isFormVisible: boolean = false;
	constructor(
    private visibleService: visibleService,
    private formbuild: FormBuilder,
    private adService: adService) { }

  ngOnInit(): void {
    this._initForm();
  }
  private _initForm(){
  this.FormValid = this.formbuild.group({
   title: [null],
   pic: [''],
   pic1: [''],
   pic2: [''],
   desc: [null]
  });
   }

  

    
 
  isControlInvalid(controlTitle): boolean
  {
    const control = this.FormValid.controls[controlTitle];
    const result = control.invalid && control.touched;
    return result;
  }
  onSubmit(){
    
    const controls = this.FormValid.controls;
    
    /*if(this.FormValid.invalid)
    {
      //console.log(controls);
      Object.keys(controls).forEach(controlName=>{
        //console.log(controls[controlName].markAsTouched())
        controls[controlName].markAsTouched()
      });
      return;
    }*/
    
    //console.log(this.FormValid.value);
    let data = this.FormValid.value;
    let title = data.title;
    let desc = data.desc;
    let pic=[data.pic];
    if(data.pic1!='')
      pic.push(data.pic1)
    if(data.pic2!='')
      pic.push(data.pic2)

    const body = {
      title: title,
      desc: desc,
      pic: pic
    }
    //console.log(body);
    const answer = this.adService.addAdService(body).subscribe(message=>
    {
      this.isFormVisible = false;
      this.msg = message;
      setTimeout(()=>{
        this.isStatusVisible=true;
        setTimeout(()=>{
          this.adService.getAds(1)//костыль
        this.isStatusVisible=false
      }
        ,6000);
      }
        ,200);
    }, error=>{
      this.msg = "Хэей, ошибка формы"; console.log(error);
    })
    
    
    
  }
  toggle()
  {
    this.isFormVisible = this.visibleService.toggle();
    
  }

  increment() { return this.counter++; }
}

