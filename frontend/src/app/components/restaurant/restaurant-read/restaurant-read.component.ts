import { Component, OnInit } from '@angular/core';
import { Restaurant } from "@app/models/restaurant.model";
import { RestaurantService } from "@app/services/restaurant.service";

@Component({
  selector: 'app-restaurant-read',
  templateUrl: './restaurant-read.component.html',
  styleUrls: ['./restaurant-read.component.css']
})
export class RestaurantReadComponent implements OnInit {

  constructor(private restaurantService: RestaurantService) { }

  restaurant: Restaurant[]

  displayedColumns = ['id', 'name', 'action']

  ngOnInit(): void {
    this.restaurantService.read().subscribe(restaurant => {
      this.restaurant = restaurant
    });
  }
}
