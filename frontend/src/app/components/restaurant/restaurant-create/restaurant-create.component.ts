import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from "@app/models/restaurant.model";
import { RestaurantService } from "@app/services/restaurant.service";

@Component({
  selector: 'app-restaurant-create',
  templateUrl: './restaurant-create.component.html',
  styleUrls: ['./restaurant-create.component.css']
})
export class RestaurantCreateComponent implements OnInit {

  restaurant: Restaurant = {
    name: ''
  }

  constructor(private restaurantService: RestaurantService,
      private router: Router) { }

  ngOnInit(): void {

  }

  createRestaurant(): void {
    this.restaurantService.create(this.restaurant).subscribe(() => {
      this.restaurantService.showMessage('Restaurante Cadastrado!')
      this.router.navigate(['/restaurant'])
    })

  }

  cancel(): void {
    this.router.navigate(['/restaurant'])
  }
}
