import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Semanas } from '@app/models/semana.model';
import { SemanaService } from '@app/services/semana.service';

@Component({
  selector: "app-semanas-delete",
  templateUrl: "./semanas-delete.component.html",
  styleUrls: ["./semanas-delete.component.css"],
})
export class SemanasDeleteComponent implements OnInit {
  semanas: Semanas;

  constructor(
    private semanasService: SemanaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.semanasService.readById(id).subscribe((semanas) => {
      this.semanas = semanas;
    });
  }

  deleteSemanas(): void {
    this.semanasService.delete(this.semanas.id).subscribe(() => {
      this.semanasService.showMessage("Semana excluida com sucesso!");
      this.router.navigate(["/semanas"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/semanas"]);
  }
}
