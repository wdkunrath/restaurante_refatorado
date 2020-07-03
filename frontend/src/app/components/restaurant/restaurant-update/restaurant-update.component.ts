import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Restaurant } from "@app/models/restaurant.model";
import { RestaurantService } from "@app/services/restaurant.service";

@Component({
  selector: "app-restaurant-update",
  templateUrl: "./restaurant-update.component.html",
  styleUrls: ["./restaurant-update.component.css"],
})
export class RestaurantUpdateComponent implements OnInit {
  restaurant: Restaurant;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.restaurantService.readById(id).subscribe((restaurant) => {
      this.restaurant = restaurant;
    });
  }

  updateRestaurant(): void {
    this.restaurantService.update(this.restaurant).subscribe(() => {
      this.restaurantService.showMessage("Restaurante atualizado com sucesso!");
      this.router.navigate(["/restaurant"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/restaurant"]);
  }
}
