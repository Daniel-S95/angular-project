import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import IUser from 'src/app/models/IUser';
import isIsraeliIdValid from 'israeli-id-validator';
import { PageTitleService } from 'src/app/services/page-title.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationStep = 1;

  // First step controls
  idNumberFormControl = new FormControl('', [Validators.required, this.isIdNumberValid()]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$')]);
  repeatPasswordFormControl = new FormControl('', [Validators.required, this.isPasswordIdentical()]);

  // Second step controls
  citiesControl = new FormControl('', Validators.required);
  cities = ["Jerusalem", "Tel Aviv", "Haifa", "Rishon LeZion", "Petah Tikva", "Ashdod", "Netanya", "Beersheba", "Bnei Brak", "Holon"];
  addressFormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  firstNameFormControl = new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z]+(([,.] |[ '-])[A-Za-z]+)*([.,'-]?)$"), Validators.minLength(3)]);
  lastNameFormControl = new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z]+(([,.] |[ '-])[A-Za-z]+)*([.,'-]?)$"), Validators.minLength(3)]);

  constructor(private _snackBarService: SnackBarService, private _userService: UserService, private _stateService: StateService,
    private _router: Router, private _titleService: PageTitleService) {
    this._titleService.setTitle('Registration');
  }

  ngOnInit(): void {
    this.passwordFormControl.valueChanges.subscribe(() => {
      this.repeatPasswordFormControl.updateValueAndValidity();
    });
  }

  changeRegisterStep(stepNumber: number) {
    if (!stepNumber) {
      return;
    }

    if (stepNumber === 2) {
      const userEmailAndIdNumber = { email: this.emailFormControl.value.trim(), idNumber: this.idNumberFormControl.value.trim() };

      const registerObservable = this._userService.emailAndIdNumberUnique(userEmailAndIdNumber);
      registerObservable.subscribe(() => {
        this.registrationStep = stepNumber;
      }, (error) => {
        console.error(error);
        this._snackBarService.openSnackBar(error.error, "", "error-snackbar");
      });

    } else {
      this.registrationStep = stepNumber;
    }
  }

  removeCharsFromString() {
    const onlyNumbersInString = this.idNumberFormControl.value.replace(/\D/g, '');
    this.idNumberFormControl.setValue(onlyNumbersInString);
  }

  onRegisterClick() {
    let invalidForm = this.idNumberFormControl.invalid || this.emailFormControl.invalid || this.passwordFormControl.invalid ||
      this.repeatPasswordFormControl.invalid || this.passwordFormControl.value !== this.repeatPasswordFormControl.value ||
      this.citiesControl.invalid || this.addressFormControl.invalid || this.firstNameFormControl.invalid ||
      this.lastNameFormControl.invalid || this.firstNameFormControl.value.trim().length < 3 ||
      this.firstNameFormControl.value.length > 45 || this.lastNameFormControl.value.trim().length < 3 ||
      this.lastNameFormControl.value.length > 45 || this.emailFormControl.value.length > 100 ||
      this.addressFormControl.value.trim().length < 3 || this.addressFormControl.value.length > 100 ||
      this.passwordFormControl.value.trim().length < 8 || this.passwordFormControl.value.length > 45;

    if (invalidForm) {
      this._snackBarService.openSnackBar("Please fill the form correctly.", "", "error-snackbar");
      return;
    }

    const userRegistrationData = {
      firstName: this.firstNameFormControl.value.trim(),
      lastName: this.lastNameFormControl.value.trim(),
      email: this.emailFormControl.value.trim(),
      idNumber: this.idNumberFormControl.value.trim(),
      password: this.passwordFormControl.value,
      city: this.citiesControl.value.trim(),
      streetAddress: this.addressFormControl.value.trim()
    };

    const registerObservable = this._userService.register(userRegistrationData);
    registerObservable.subscribe(() => {
      const userLoginData = { email: this.emailFormControl.value.trim(), password: this.passwordFormControl.value };
      this._snackBarService.openSnackBar("You've registered successfully!", "", "success-snackbar");

      const loginObservable = this._userService.login(userLoginData);
      loginObservable.subscribe((response: { token: string, firstName: string }) => {
        let token = response.token;
        let firstName = response.firstName;

        localStorage.setItem("token", JSON.stringify({ token, firstName }));

        const helper = new JwtHelperService();
        const decodedToken: IUser = helper.decodeToken(token!);

        this._stateService.firstName = firstName;
        this._stateService.userType = decodedToken.userType;
        this._stateService.isLogged = true;
        this._stateService.userId = decodedToken.userId;

        this._userService.getUserData();

        this._router.navigate(["/"]);
      }, (error) => {
        console.error(error);
        this._snackBarService.openSnackBar(error.error, "", "error-snackbar");
      });

    }, (error) => {
      console.error(error);
      this._snackBarService.openSnackBar(error.error, "", "error-snackbar");
    });
  }

  isIdNumberValid(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isIsraeliIdValid(control.value)) {
        return null;
      } else {
        return { idInvalid: true };
      }
    }
  }

  isPasswordIdentical(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === this.passwordFormControl.value) {
        return null;
      } else {
        return { isDifferent: true };
      }
    }
  }
}
