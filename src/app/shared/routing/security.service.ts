import {Injectable} from '@angular/core';
import {Role} from './role';
import {Observable, of} from 'rxjs';

@Injectable()
export class SecurityService {
  currentRoles: Role[] = [Role.ADMIN, Role.ANONYMOUS];
  uuid;

  constructor() {
    this.uuid = Date.now();
  }

  getCurrentUserRoles(): Observable<Role[]> {
    return of(this.currentRoles);
  }

  changeRoleTo(isAdmin: boolean) {
    if (isAdmin) {
      this.currentRoles = [Role.ADMIN];
    } else {
      this.currentRoles = [Role.ANONYMOUS];
    }
  }

  getUUID() {
    return Math.random().toString(36).substring(2)
      + (new Date()).getTime().toString(36);
  }
}
