import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isAuth = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuth) {
    router.navigate(['/auth']);
    return false;
  }

  return true;
};
