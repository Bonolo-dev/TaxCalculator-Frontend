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
      //this.taxResult=userTaxResults;
      this.taxResult = {
        paye: Number((userTaxResults.paye).toFixed(2)),
        payeRaw: Number((userTaxResults.payeRaw).toFixed(2)),
        netPay: Number((userTaxResults.netPay).toFixed(2)),
        taxCredit: Number((userTaxResults.taxCredit).toFixed(2))
      }
      
      this.printPeriod="Annually";
    });
  }

  buildUserDetails(){

    let earnigsEnum = 
    this.taxForm.value.earningType=="Monthly"?EarningType.MONTHLY:EarningType.ANNUALLY;
    
    this.userInput = {
      age:this.taxForm.value.personAge,
      totalEarnings: this.taxForm.value.grossSalary,
      earningsType: earnigsEnum,
      medicalAidDependants: 0,
      taxYear: this.taxForm.value.taxYear}
  }

  
  togglePrintPeriod(){

    if(this.printPeriod=="Annually"){
  
      //This is solely for display on the results table
      this.printPeriod = "Monthly";
      
      //Fix to 2 decimal places
      //Should have opted to use currency api
      this.taxResult = {
        paye: Number((this.taxResult.paye/12).toFixed(2)),
        payeRaw: Number((this.taxResult.payeRaw/12).toFixed(2)),
        netPay: Number((this.taxResult.netPay/12).toFixed(2)),
        taxCredit: Number((this.taxResult.taxCredit/12).toFixed(2))}
    }
    else if(this.printPeriod=="Monthly"){

      this.printPeriod = "Annually";

      //Fix to 2 decimal places
      //Should have opted to use currency api
      this.taxResult = {
        paye: Number((this.taxResult.paye*12).toFixed(2)),
        payeRaw: Number((this.taxResult.payeRaw*12).toFixed(2)),
        netPay: Number((this.taxResult.netPay*12).toFixed(2)),
        taxCredit: Number((this.taxResult.taxCredit*12).toFixed(2))
      }
    }
  }
}
