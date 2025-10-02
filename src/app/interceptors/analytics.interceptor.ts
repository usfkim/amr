import { HttpInterceptorFn } from '@angular/common/http';

export const analyticsInterceptor: HttpInterceptorFn = (req, next) => {
  // Track API calls for analytics
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    window.gtag('event', 'api_call', {
      event_category: 'API',
      event_label: req.url,
      custom_map: { metric1: 'api_endpoint' }
    });
  }

  return next(req);
};