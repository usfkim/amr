import { HttpInterceptorFn } from '@angular/common/http';

export const securityInterceptor: HttpInterceptorFn = (req, next) => {
  // Add security headers to all requests
  const secureReq = req.clone({
    setHeaders: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    }
  });

  return next(secureReq);
};