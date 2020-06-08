import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { RouterExtenderService } from "../_services/router-extender.service";
import { ShopAgentService } from "../_services/shop-agent.service";
import { IngredShop } from "../_models/ingredShop";
import { ProdShop } from "../_models/prodShop";
import { Product } from "../_models/product";

@Component({
  selector: "app-shopping-agent",
  templateUrl: "./shopping-agent.component.html",
  styleUrls: ["./shopping-agent.component.css"],
})
export class ShoppingAgentComponent implements OnInit {
  ingredList: IngredShop[] = [];
  public ingredDataTable: any;
  public messageFlag = false;

  constructor(
    private routerExtService: RouterExtenderService,
    private shopService: ShopAgentService,
    private changeRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const prodList = this.routerExtService.getData() as Product[];
    let prodShopList: ProdShop[] = [];

    prodList.forEach((prod: Product) => {
      prodShopList.push({
        id: prod.id,
        predictedAmount: prod.predictedAmount,
      } as ProdShop);
    });

    this.shopService
      .getIngredListToBuy(prodShopList)
      .subscribe((res: IngredShop[]) => {
        this.ingredList = res;
        
        this.changeRef.detectChanges();
        const ingredTable: any = $("#shop-table").on(
          "order.dt",
          function () {}
        );
        this.ingredDataTable = ingredTable.DataTable({
          lengthMenu: [
            [3, 5, 7, -1],
            [3, 5, 7, "All"],
          ],
        });

        this.messageFlag=true;
      });
  }
}
