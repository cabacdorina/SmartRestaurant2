import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/utils/auth.service";
import { AlertifyService } from "../_services/utils/alertify.service";
import { Router } from "@angular/router";
import { PredictService } from "../_services/predict.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  model: any = {};
  collapsed = true;
  role: string;
  predictAllFlag: boolean = false;

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private predService: PredictService
  ) {}

  ngOnInit() {
    this.authService.roleEmitter.subscribe((res)=>{
      this.role = res;
    })

    this.predService.predictFlagEmitter.subscribe((value:boolean)=>{
      this.predictAllFlag = value;
    });
  }

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        this.alertify.success("Logged in successfully");       
      },
      (error) => {
        this.alertify.error(error);
      },
      () => {
        this.router.navigate(["/desserts"]);
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem("token");
    this.alertify.message("logged out");
    this.router.navigate(["/home"]).then(()=>{
      window.location.reload();
    });
  }

  goToDesserts() {
    this.router.navigate(["/desserts"]);
    console.log("dessert pressed");
  }

  goToMainFood() {
    this.router.navigate(["/mainFood"]);
    console.log("main food pressed");
  }

  goToSoups() {
    this.router.navigate(["/soups"]);
  }
}
