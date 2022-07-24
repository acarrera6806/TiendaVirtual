import { Component} from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
/**
 * 
 * @param auth 
 */
  constructor(private auth:AuthService) { }
  logout(){
    this.auth.logout()
  }

}
