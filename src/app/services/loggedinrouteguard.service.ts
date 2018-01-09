
import { Injectable } from '@angular/core';
import { CanActivate,Router ,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import { ApphttpService } from './apphttp.service';

@Injectable()
export class LoggedinrouteguardService implements CanActivate {

  constructor(private loginService:ApphttpService,private router:Router) { 
    
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;
    if (!this.loginService.getIsLoggedIn()) {
      return true; 
    }
    return false;
  }
}

