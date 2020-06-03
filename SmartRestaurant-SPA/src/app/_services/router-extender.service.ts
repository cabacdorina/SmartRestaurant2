import { Injectable } from "@angular/core";
import { Location } from "@angular/common";
import { Router, NavigationExtras } from "@angular/router";

@Injectable()
export class RouterExtenderService {
  private data: any;

  constructor(public router: Router, public location: Location) {}

  public navigate(url: string, data: any = "", options?: NavigationExtras): Promise<boolean> {
    this.data = data;
    return this.router.navigate([url], options);
  }

  public navigateByUrl(url: string, data: any = "", options?: NavigationExtras): Promise<boolean> {
    this.data = data;
    return this.router.navigateByUrl(url, options);
  }

  public navigateBack(url: string,  options?: NavigationExtras): Promise<boolean> {
    return this.router.navigateByUrl(url, options);
  }

  public goBack(): Promise<any> {//asynchron + it will return data at a time or a error
    return new Promise((resolve, reject) => {
      try {
        this.location.back();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  public getData(): any {
    return this.data;
  }
}
