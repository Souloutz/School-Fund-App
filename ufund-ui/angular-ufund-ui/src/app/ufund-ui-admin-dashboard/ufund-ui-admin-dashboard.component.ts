import { Component } from '@angular/core';

@Component({
  selector: 'app-ufund-ui-admin-dashboard',
  templateUrl: './ufund-ui-admin-dashboard.component.html',
  styleUrl: './ufund-ui-admin-dashboard.component.css'
})
export class UfundUiAdminDashboardComponent {
  objects = [
    {name: "ITEM", description: "Replace these items with the acutal list once thats made"},
    {name: "ITEM", description: "Replace these items with the acutal list once thats made"},
    {name: "ITEM", description: "Replace these items with the acutal list once thats made"},
    {name: "ITEM", description: "Replace these items with the acutal list once thats made"},
    {name: "ITEM", description: "Replace these items with the acutal list once thats made"},
    {name: "ITEM", description: "Replace these items with the acutal list once thats made"},
    {name: "ITEM", description: "Replace these items with the acutal list once thats made"},
    {name: "ITEM", description: "Replace these items with the acutal list once thats made"},
    {name: "ITEM", description: "Replace these items with the acutal list once thats made"},
    {name: "ITEM", description: "Replace these items with the acutal list once thats made"},
    {name: "ITEM", description: "Replace these items with the acutal list once thats made"},
    {name: "ITEM", description: "Replace these items with the acutal list once thats made"}
  ]; 

  selected(object: any){
    console.log('Item clicked:', object);
  } 
}


