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
  taxResult: TaxResults={netPay:0,payeRaw:0,paye:0,taxCredit:0};

  isAnnual: boolean = true;
  printPeriod: String;

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
  }
      

  ngOnInit(){

    this.printPeriod="Annually";
    this.send();
  } 

  send(){
    this.buildUserDetails();

    this.taxService.getTax(this.userInput).subscribe((userTaxResults:TaxResults)=>{
      this.taxResult=userTaxResults;
      this.formatTaxResults();
     
      this.printPeriod="Annually";
    });
    
  }

  private buildUserDetails(){

    let earnigsEnum = 
    this.taxForm.value.earningType=="Monthly"?EarningType.MONTHLY:EarningType.ANNUALLY;
    
    this.userInput = {
      age:this.taxForm.value.personAge,
      totalEarnings: this.taxForm.value.grossSalary,
      earningsType: earnigsEnum,
      medicalAidDependants: 0,
      taxYear: this.taxForm.value.taxYear}
  }

  private formatTaxResults(){

    this.taxResult = {
      paye: Number((this.taxResult.paye).toFixed(2)),
      payeRaw: Number((this.taxResult.payeRaw).toFixed(2)),
      netPay: Number((this.taxResult.netPay).toFixed(2)),
      taxCredit: Number((this.taxResult.taxCredit).toFixed(2))
    }

  }

  
  togglePrintPeriod(){

    if(this.printPeriod=="Annually"){
  
      //This is solely for display on the results table
      this.printPeriod = "Monthly";
      
      this.taxResult = {
        paye: this.taxResult.paye/12,
        payeRaw:this.taxResult.payeRaw/12,
        netPay: this.taxResult.netPay/12,
        taxCredit: this.taxResult.taxCredit/12
      }
    }
    else if(this.printPeriod=="Monthly"){

      this.printPeriod = "Annually";

      this.taxResult = {
        paye: this.taxResult.paye*12,
        payeRaw: this.taxResult.payeRaw*12,
        netPay: this.taxResult.netPay*12,
        taxCredit: this.taxResult.taxCredit*12
      }
    }

    //Fix to 2 decimal places
    //Should have opted to use currency api
    this.formatTaxResults();  
  }
}
