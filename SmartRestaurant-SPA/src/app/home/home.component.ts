import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../_services/register.service';
import { AuthService } from '../_services/utils/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerState: boolean = false;

  constructor(
    private registerService: RegisterService, private authService: AuthService) { }

  ngOnInit() {
    this.registerService.toggleRegister.subscribe((val: boolean) =>{
      this.registerState = val;
    })
  }

  registerToggle() {
    this.registerService.actionToggle(true);
  }

  isLoggedIn(){
    return this.authService.loggedIn();
  }
}
