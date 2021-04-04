import { Component,OnInit } from '@angular/core';
import { EarningType } from './model/earning-type';
import { TaxResults } from './model/tax-results';
import { UserDetails } from './model/user-details';
import { serverApiService } from './service/server-api.service';
import { ReactiveFormsModule ,Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'TaxCalculator-Frontend';

  userInput: UserDetails;
  taxResult: TaxResults;

  yearOptions = ['2021','2020'];
  earningTypeOptions = ["Annually", "Monthly"]

  taxForm: FormGroup;


  constructor(private taxService: serverApiService,private builder: FormBuilder) {

    this.taxForm = new FormGroup({  
      grossSalary: new FormControl('498000',[Validators.required]),  
      earningType: new FormControl('Annually',Validators.required),
      personAge: new FormControl('25',Validators.required),
      taxYear: new FormControl('2021',Validators.required),
  });


    // this.userInput = {age:42,earningsType:"Annually"
    //   ,medicalAidDependants:0,taxYear:2021,totalEarnings:498000};

  }
      

  ngOnInit(){
    
  } 

  send(){

    this.setEarningType();

    console.log(this.userInput);
    this.taxService.getTax(this.userInput).subscribe(userTaxResults=>{
      this.taxResult=userTaxResults;
      console.log(userTaxResults);
    });
  }

  setEarningType(){

    if(this.userInput.earningsType=="Monthly"){

      this.userInput.earningsType=EarningType.MONTHLY;

    }
    else if(this.userInput.earningsType=="Annually"){
      this.userInput.earningsType=EarningType.ANNUALLY;
    }
    else{
      return throwError("Invalid Period");
    }

  }
    
}
