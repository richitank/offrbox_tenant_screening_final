import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { TenantAuth } from "./tenant-auth.service";

@Injectable()
export class TenantAuthInterceptor implements HttpInterceptor {
    constructor(private tenantAuth: TenantAuth) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.tenantAuth.getToken();
        const authRequest = req.clone({
            headers: req.headers.set("TenantAuthorization", "Bearer " + authToken)
        })
        return next.handle(authRequest);

    }
}