import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import IUser from 'src/app/models/IUser';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { StateService } from 'src/app/services/state.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]);
  passwordFormControl = new FormControl('', [Validators.required]);

  userLoginDetails = [{ type: "Admin", email: "daniel@fresh-choice.com", password: "Adm!n2022" },
  { type: "User", email: "user@fresh-choice.com", password: "U$er2022" },
  { type: "User", email: "rami@rami-levi.co.il", password: "Ram1Lev!" },
  { type: "User", email: "agam492@gmail.com", password: "_Lake492_" },
  { type: "User", email: "ori56@walla.com", password: "Ori_5656" },
  { type: "User", email: "ohad.katz@gmail.com", password: "Ohad$9090" },
  { type: "User", email: "tal111@gmail.com", password: "Ta!123456" },
  { type: "User", email: "omery19@walla.com", password: "OmerY0!9" }
  ];

  public isLogged = localStorage.getItem("token");

  constructor(private _snackBarService: SnackBarService, private _userService: UserService,
    private _stateService: StateService, private _router: Router) { }

  onLoginClick() {
    if (this.emailFormControl.invalid || this.passwordFormControl.invalid) {
      this._snackBarService.openSnackBar("Please fill your login details", "", "error-snackbar");
      return;
    }

    const userData = { email: this.emailFormControl.value.trim(), password: this.passwordFormControl.value };

    const loginObservable = this._userService.login(userData);
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

      this.passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

      if (decodedToken.userType === "ADMIN") {
        this._router.navigate(['/admin']);
      }
    }, (error) => {
      console.error(error);
      this._snackBarService.openSnackBar(error.error, "", "error-snackbar");
    });
  }

  setUserLogin(user: { type: string, email: string, password: string }) {
    this.emailFormControl.setValue(user.email);
    this.passwordFormControl.setValue(user.password);
  }
}
