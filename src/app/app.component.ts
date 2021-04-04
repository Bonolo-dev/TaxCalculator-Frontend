import { Component,OnInit } from '@angular/core';
import { EarningType } from './model/earning-type';
import { TaxResults } from './model/tax-results';
import { UserDetails } from './model/user-details';
import { serverApiService } from './service/server-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'TaxCalculator-Frontend';

  userInput: UserDetails;
  taxResult: TaxResults[]=[];

  constructor(private taxService: serverApiService) {

    this.userInput = {age:42,earningType:EarningType.ANNUALLY
      ,medicalAidDependants:0,taxYear:2021,totalEarnings:498000};

  }



  ngOnInit(){
    console.log('start');

    console.log(this.userInput)
    this.taxService.getTax(this.userInput).subscribe((userTax:UserDetails)=>{

      console.log(userTax);
      this.userInput=userTax;
    });
  }

    
}
