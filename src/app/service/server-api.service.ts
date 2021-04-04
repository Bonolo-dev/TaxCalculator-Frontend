import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserDetails } from '../model/user-details';
import { TaxResults } from '../model/tax-results';

@Injectable()
export class serverApiService {

    constructor(private http: HttpClient) { }

    calculateTaxUrl= '/calculate';

    getTax(userDetails: UserDetails ): Observable<any> {    
        return this.http.post(this.calculateTaxUrl, JSON.stringify(userDetails)
            ,{ headers: { 'Content-Type': 'application/json' }})
            .pipe( map(
                (taxResult:TaxResults)=>{
                    return taxResult
                }    
                ,catchError=>{
                    ("Tax calculation error " + catchError)    
                }));
  
    }

}