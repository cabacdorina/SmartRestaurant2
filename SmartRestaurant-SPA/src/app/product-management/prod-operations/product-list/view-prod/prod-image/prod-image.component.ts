import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-prod-image',
  templateUrl: './prod-image.component.html',
  styleUrls: ['./prod-image.component.css']
})
export class ProdImageComponent implements OnInit {
  @Input() public imageUrl: string;
  constructor() { }

  ngOnInit() {
  }

}
