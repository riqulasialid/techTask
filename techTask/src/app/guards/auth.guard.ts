import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  let isAuth = false;

  if (isPlatformBrowser(platformId)) {
    isAuth = localStorage.getItem('isAuthenticated') === 'true';
  }

  if (!isAuth) {
    router.navigate(['/auth']);
    return false;
  }

  return true;
};
