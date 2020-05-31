import { Component, OnInit } from "@angular/core";
import { RegisterService } from "../_services/register.service";


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  model: any = {};

  registerState: boolean;
  constructor(private registerService: RegisterService) {}

  ngOnInit() {}

  register() {
    this.model.type = 0;
    this.registerService.register(this.model);
  }

  cancel() {
    this.registerService.actionToggle(false);
  }
}
