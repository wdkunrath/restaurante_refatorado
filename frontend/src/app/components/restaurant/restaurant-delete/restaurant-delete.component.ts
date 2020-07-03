import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Restaurant } from "@app/models/restaurant.model";
import { RestaurantService } from "@app/services/restaurant.service";

@Component({
  selector: "app-restaurant-delete",
  templateUrl: "./restaurant-delete.component.html",
  styleUrls: ["./restaurant-delete.component.css"],
})
export class RestaurantDeleteComponent implements OnInit {
  restaurant: Restaurant;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.restaurantService.readById(id).subscribe((restaurant) => {
      this.restaurant = restaurant;
    });
  }

  deleteRestaurant(): void {
    this.restaurantService.delete(this.restaurant.id).subscribe(() => {
      this.restaurantService.showMessage("Restaurante excluido com sucesso!");
      this.router.navigate(["/restaurant"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/restaurant"]);
  }
}
