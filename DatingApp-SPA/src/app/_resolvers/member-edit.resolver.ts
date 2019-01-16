import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { User } from '../_model/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
    constructor(private userService: UserService, private router: Router, private authService: AuthService
        , private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(this.authService.decodeToken.nameid).pipe(
            catchError(error => {
                this.alertify.error('Problem retriving your data!');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}
