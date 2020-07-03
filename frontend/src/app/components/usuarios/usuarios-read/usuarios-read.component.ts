import { Component, OnInit } from '@angular/core';
import { Usuarios } from "@app/models/usuarios.model";
import { UsuarioService } from "@app/services/usuarios.service";

@Component({
  selector: 'app-usuarios-read',
  templateUrl: './usuarios-read.component.html',
  styleUrls: ['./usuarios-read.component.css']
})

export class UsuariosReadComponent implements OnInit {

  usuarios: Usuarios[]
  displayedColumns = ['id', 'name', 'cargo','action']

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.read().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

}
