import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  imports: [
    NgFor,
    RouterLink
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
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

  selected(object: any): void {
    console.log('Item clicked:', object);
  } 
}
