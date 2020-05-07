import {
  Component,
  OnInit,
  Query,
  ElementRef,
  ChangeDetectorRef,
  Output,
  Input,
} from "@angular/core";
import { Product } from "src/app/_models/product";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-predict-all",
  templateUrl: "./predict-all.component.html",
  styleUrls: ["./predict-all.component.css"],
})
export class PredictAllComponent implements OnInit {

  @Input() public dessertFl: boolean;
  @Input() public mainFoodFl: boolean;
  @Input() public soupFl: boolean;

  constructor() {}

  ngOnInit() {}
}
