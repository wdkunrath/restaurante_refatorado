import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Usuarios } from "@app/models/usuarios.model";
import { UsuarioService } from "@app/services/usuarios.service";

@Component({
  selector: "app-usuarios-update",
  templateUrl: "./usuarios-update.component.html",
  styleUrls: ["./usuarios-update.component.css"],
})
export class UsuariosUpdateComponent implements OnInit {
  usuarios: Usuarios;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.usuarioService.readById(id).subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }

  updateUsuarios(): void {
    this.usuarioService.update(this.usuarios).subscribe(() => {
      this.usuarioService.showMessage("Usuários atualizado com sucesso!");
      this.router.navigate(["/usuarios"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/usuarios"]);
  }
}
