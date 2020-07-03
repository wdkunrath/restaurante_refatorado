import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { HeaderService } from '@app/services/header.service';
import { User } from '@app/models';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html' })
export class HomeComponent {
    loading = false;
    users: User[];

    constructor(
      private userService: UserService,
      private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Início',
        icon: 'home',
        routeUrl: 'home'
      }
    }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }
}
