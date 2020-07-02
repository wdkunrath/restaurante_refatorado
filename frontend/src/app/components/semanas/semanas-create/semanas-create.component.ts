import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Semanas } from '../../../models/semana.model';
import { SemanaService } from '../../../service/semana.service';

@Component({
  selector: 'app-semanas-create',
  templateUrl: './semanas-create.component.html',
  styleUrls: ['./semanas-create.component.css']
})
export class SemanasCreateComponent implements OnInit {

  semanas: Semanas = {
    name: ''
  }

  constructor(private semanaService: SemanaService,
      private router: Router) { }

  ngOnInit(): void {
    
  }

  createSemanas(): void {
    this.semanaService.create(this.semanas).subscribe(() => {
      this.semanaService.showMessage('Semana Cadastrada!')
      this.router.navigate(['/semanas'])
    })

  }

  cancel(): void {
    this.router.navigate(['/semanas'])
  }
}
