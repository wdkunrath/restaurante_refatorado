import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuarios } from "@app/models/usuarios.model";
import { UsuarioService } from "@app/services/usuarios.service";

@Component({
  selector: 'app-usuarios-create',
  templateUrl: './usuarios-create.component.html',
  styleUrls: ['./usuarios-create.component.css']
})
export class UsuariosCreateComponent implements OnInit {

  usuarios: Usuarios = {
    username: '',
    cargo: '',
    password: '',
    firstName: '',
    lastName: '',
    token: ''
  }

  constructor(private usuarioService: UsuarioService,
      private router: Router) { }

  ngOnInit(): void {

  }

  createUsuarios(): void {
    this.usuarioService.create(this.usuarios).subscribe(() => {
      this.usuarioService.showMessage('Usuário Cadastrado!')
      this.router.navigate(['/usuarios'])
    })

  }

  cancel(): void {
    this.router.navigate(['/usuarios'])
  }
}
