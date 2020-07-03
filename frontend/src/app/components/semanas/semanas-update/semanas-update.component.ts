import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Semanas } from '@app/models/semana.model';
import { SemanaService } from '@app/services/semana.service';

@Component({
  selector: "app-semanas-update",
  templateUrl: "./semanas-update.component.html",
  styleUrls: ["./semanas-update.component.css"],
})
export class SemanasUpdateComponent implements OnInit {
  semanas: Semanas;

  constructor(
    private semanaService: SemanaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.semanaService.readById(id).subscribe((semanas) => {
      this.semanas = semanas;
    });
  }

  updateSemanas(): void {
    this.semanaService.update(this.semanas).subscribe(() => {
      console.log(this.semanas)
      this.semanaService.showMessage("Semana atualizado com sucesso!");
      this.router.navigate(["/semanas"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/semanas"]);
  }
}
