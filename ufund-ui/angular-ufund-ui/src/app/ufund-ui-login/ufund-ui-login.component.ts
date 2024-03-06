import { Component } from '@angular/core';
import { ApiService } from "../api.service";
import { User } from '../model/user';

@Component({
  selector: 'app-ufund-ui-login',
  templateUrl: './ufund-ui-login.component.html',
  styleUrl: './ufund-ui-login.component.css'
})
export class UfundUiLoginComponent {

  constructor(private apiService: ApiService) {}

  
  signIn(user : User)
  {
    try {
      
      this.apiService.getUserByEmail(user.email).subscribe(
        (emailResponse: User) =>
        {
          console.log('User data: ', emailResponse);
          const userResponse : User = emailResponse;
          if(userResponse) {
            if(user.password == userResponse.password)
            {
              console.log("Sucess!");
            }
          }
        }
      )
    }
    catch (error) {
      console.error("Error logging in: ", error);
    }
  }

}
