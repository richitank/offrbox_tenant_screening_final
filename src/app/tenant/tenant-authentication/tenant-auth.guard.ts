import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

import { TenantAuth } from "./tenant-auth.service";


@Injectable()
export class TenantAuthGuard implements CanActivate{
    constructor(private tenantAuth: TenantAuth, private router: Router) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        const isAuth = this.tenantAuth.getIsAuth();
        //console.log(isAuth)
        if(!isAuth) {
             this.router.navigate(["/tenant-signin"])
        }
        return isAuth;        
    }

}
