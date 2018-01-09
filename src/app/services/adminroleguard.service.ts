
import { Injectable } from '@angular/core';
import { CanActivate,Router ,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import { ApphttpService } from './apphttp.service';
import { DataService } from './data.service';

@Injectable()
export class AdminroleguardService implements CanActivate {

  constructor(private loginService:ApphttpService,private router:Router,private dataService:DataService) { 
    
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;
    if (this.dataService.getUserData().isAdmin) {
      return true; 
    }
       
    return false;
  }



}

