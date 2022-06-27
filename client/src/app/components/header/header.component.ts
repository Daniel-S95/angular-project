import { Component, OnInit } from '@angular/core';
import IUser from 'src/app/models/IUser';
import { JwtHelperService } from "@auth0/angular-jwt";
import { StateService } from 'src/app/services/state.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public _stateService: StateService, private _router: Router, private _userService: UserService) { }

  ngOnInit(): void {
    if (this._stateService.isLogged) {
      let token = localStorage.getItem("token");
      const helper = new JwtHelperService();
      const decodedToken: IUser = helper.decodeToken(token!);
      let userType = decodedToken.userType;

      let firstName = JSON.parse(token!).firstName;
      this._stateService.firstName = firstName;
      this._stateService.userType = userType;
      this._stateService.userId = decodedToken.userId;

      this._userService.getUserData();
    }
  }

  onLogoutClick() {
    localStorage.removeItem("token");
    this._stateService.isLogged = false;
    this._stateService.userType = "";
    this._stateService.firstName = "";
    this._stateService.userId = null;
    this._router.navigate(['']);
  }
}
