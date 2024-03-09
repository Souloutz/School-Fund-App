import { Component } from '@angular/core';

import { UserService } from "../user.service";
import { CurrentUserService } from '../current.user.service';

import { User } from '../model/user';

@Component({
  selector: 'app-ufund-ui-account',
  templateUrl: './ufund-ui-account.component.html',
  styleUrl: './ufund-ui-account.component.css'
})
export class UfundUiAccountComponent {

  constructor(
    private currentUserService : CurrentUserService,
    private userService : UserService) {}

}
