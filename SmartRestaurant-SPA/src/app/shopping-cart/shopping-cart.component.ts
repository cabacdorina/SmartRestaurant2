import { Component, OnInit } from "@angular/core";
import { Product } from "../_models/product";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"],
})
export class ShoppingCartComponent implements OnInit {
  public prodList: Product[] = [];

  constructor() {
    this.prodList.push({
      amount: 5,
      name: "Branza Tofu",
      price: 5,
      imageUrl: "https://cdn1.imggmi.com/uploads/2020/5/30/36dbca25ba05071dc523feadb073aebf-full.jpg"
    } as Product);

    this.prodList.push({
      amount: 5,
      name: "Branza Tofu 2",
      price: 5,
      imageUrl: "https://cdn1.imggmi.com/uploads/2020/5/30/36dbca25ba05071dc523feadb073aebf-full.jpg"
    } as Product)
  }

  ngOnInit() {
    /* Assign actions */
    $(".product-quantity input").change(() => {
      this.updateQuantity(this);
    });   
  }
  /* Set rates + misc */
  public taxRate = 0.05;
  public shippingRate = 15.0;
  public fadeTime = 300;

  /* Recalculate cart */
  public recalculateCart() {
    var subtotal = 0;

    /* Sum up row totals */
    $(".product").each(function () {
      subtotal += parseFloat($(this).children(".product-line-price").text());
    });

    /* Calculate totals */
    var tax = subtotal * this.taxRate;
    var shipping = subtotal > 0 ? this.shippingRate : 0;
    var total = subtotal + tax + shipping;

    /* Update totals display */
    $(".totals-value").fadeOut(this.fadeTime, () => {
      $("#cart-subtotal").html(subtotal.toFixed(2));
      $("#cart-tax").html(tax.toFixed(2));
      $("#cart-shipping").html(shipping.toFixed(2));
      $("#cart-total").html(total.toFixed(2));

      if (total == 0) {
        $(".checkout").fadeOut(this.fadeTime);
      } else {
        $(".checkout").fadeIn(this.fadeTime);
      }
      $(".totals-value").fadeIn(this.fadeTime);
    });
  }

  /* Update quantity */
  public updateQuantity(quantityInput) {
    /* Calculate line price */
    const productRow = $(quantityInput).parent().parent();
    const price = parseFloat(productRow.children(".product-price").text());
    const quantity = $(quantityInput).val() as number;
    const linePrice = price * quantity;

    /* Update line price display and recalc cart totals */
    productRow.children(".product-line-price").each(() => {
      $(this).fadeOut(this.fadeTime, function () {
        $(this).text(linePrice.toFixed(2));
        this.recalculateCart();
        $(this).fadeIn(this.fadeTime);
      });
    });
  }

  /* Remove item from cart */
  removeItem(removeButton) {
    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent();
    productRow.slideUp(this.fadeTime, function () {
      productRow.remove();
      this.recalculateCart();
    });
  }
}
