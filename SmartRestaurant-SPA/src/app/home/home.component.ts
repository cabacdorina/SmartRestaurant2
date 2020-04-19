import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../_services/register.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerState: boolean = false;

  constructor(
    private registerService: RegisterService) { }

  ngOnInit() {
    this.registerService.toggleRegister.subscribe((val: boolean) =>{
      this.registerState = val;
    })
  }

  registerToggle() {
    this.registerService.actionToggle(true);
  }
}
