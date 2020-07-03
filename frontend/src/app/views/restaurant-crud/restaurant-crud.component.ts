import { HeaderService } from '@app/services/header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-restaurant-crud',
  templateUrl: './restaurant-crud.component.html',
  styleUrls: ['./restaurant-crud.component.css']
})
export class RestaurantCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Cadastro de Restaurantes',
      icon: 'storefront',
      routeUrl: '/restaurant'
    }
  }

  ngOnInit(): void {
  }

  navigateToRestaurantCreate(): void {
    this.router.navigate(['/restaurant/create'])
  }

}
