import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Product } from 'src/app/_models/product';
import { HttpProductService } from 'src/app/_services/HttpProduct.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  prod: Product;
  constructor( private prodService: HttpProductService) { }

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
