import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/service/auth.service';
import { inject } from '@angular/core';

export const isLoggedInGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLoggedInValue = authService.isLoggedInValue();
  if (isLoggedInValue) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
