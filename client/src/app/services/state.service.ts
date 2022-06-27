import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public firstName: string = "";
  public userType: string = "";
  public isLogged: boolean = false;
  public userId: number = null;

  constructor() {
    if (localStorage.getItem("token")) {
      this.isLogged = true;
    }
  }
}
