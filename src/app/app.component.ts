import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-fundamentals-demo';
  actions: Array<any> = [
    {title: "Home", "route": "/home", icon:"house" },
    {title: "Products", "route": "/products", icon:"arrow-down-up" },
    {title: "newProduct", "route": "/newProduct", icon:"plus-circle"}
  ];
  currentAction:any;
  setCurrentAction(action:any):void{
    this.currentAction = action;
  }
}
