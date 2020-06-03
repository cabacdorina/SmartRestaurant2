import { Component, OnInit } from '@angular/core';
import { RouterExtenderService } from '../_services/router-extender.service';

@Component({
  selector: 'app-shopping-agent',
  templateUrl: './shopping-agent.component.html',
  styleUrls: ['./shopping-agent.component.css']
})
export class ShoppingAgentComponent implements OnInit {

  constructor(private routerExtService: RouterExtenderService) { }

  ngOnInit() {
    const prodList = this.routerExtService.getData();
    debugger;
  }
}
