import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  prod: Product;
  constructor( private prodService: ProductService) { }

  @ViewChild('editForm') edtFrm: NgForm; /*view child is a decorator */
  @HostListener('window: beforeunload', ['$event']) /*another decorator*/
  unloadNotification($event: any) {
    if (this.edtFrm.dirty) {
      $event.returnValue = true;
    }
  }

  ngOnInit() {
  }

  saveProduct(item: Product) {
    this.prodService.AddProduct(item);
  }

}
