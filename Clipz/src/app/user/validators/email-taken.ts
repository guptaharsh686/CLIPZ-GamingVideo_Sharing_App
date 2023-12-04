import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

//have to inform angular to support DI in out custom class by using injectable decorator
@Injectable({
    providedIn: 'root'
})
export class EmailTaken implements AsyncValidator {
    constructor(private auth:AngularFireAuth){

    }

    validate = (control: AbstractControl): Promise<ValidationErrors | null> => {
        return this.auth.fetchSignInMethodsForEmail(control.value).then(
            
            response => {
                console.log(response);

                return response.length ? { emailTaken : true} : null
            }
        )
    }
    registerOnValidatorChange?(fn: () => void): void {
        throw new Error("Method not implemented.");
    }


}
