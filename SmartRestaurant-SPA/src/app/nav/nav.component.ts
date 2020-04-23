import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/utils/auth.service';
import { AlertifyService } from '../_services/utils/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  collapsed=true;
  constructor(public authService: AuthService, private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error(error);
    },
    () => {
      this.router.navigate(['/desserts']);
    }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

  goToDesserts() {
    this.router.navigate(['/desserts']);
    console.log('dessert pressed');
  }

  goToMainFood() {
    this.router.navigate(['/mainFood']);
    console.log('main food pressed');
  }

  goToSoups() {
    this.router.navigate(['/soups']);
  }
}


