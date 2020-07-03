import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Usuarios } from "@app/models/usuarios.model";
import { UsuarioService } from "@app/services/usuarios.service";

@Component({
  selector: "app-usuarios-delete",
  templateUrl: "./usuarios-delete.component.html",
  styleUrls: ["./usuarios-delete.component.css"],
})
export class UsuariosDeleteComponent implements OnInit {
  usuarios: Usuarios;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.usuarioService.readById(id).subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }

  deleteUsuarios(): void {
    this.usuarioService.delete(this.usuarios.id).subscribe(() => {
      this.usuarioService.showMessage("Usuários excluido com sucesso!");
      this.router.navigate(["/usuarios"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/usuarios"]);
  }
}
