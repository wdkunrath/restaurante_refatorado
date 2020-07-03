import { Component, OnInit } from '@angular/core';
import { Semanas } from '@app/models/semana.model';
import { SemanaService } from '@app/services/semana.service';

@Component({
  selector: 'app-semanas-read',
  templateUrl: './semanas-read.component.html',
  styleUrls: ['./semanas-read.component.css']
})
export class SemanasReadComponent implements OnInit {

  semanas: Semanas[]
  displayedColumns = ['id', 'name','dataInit','dataEnd', 'action']

  constructor(private semanaService: SemanaService) { }

  ngOnInit(): void {
    this.semanaService.read().subscribe(semanas => {
      this.semanas = semanas;
    });
  }

}
