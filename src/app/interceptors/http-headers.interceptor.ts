//attached to headers; atcually gets in api and data then sends it to service
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'x-rapidapi-key': '0394069c5dmsh0e8c3226a4a59a3p1c6b6ejsndae0d64ba0f4',
        'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
        'SameSite': 'None',
      },
      setParams: {
        key: '85dc82daafc24f75a1d3e1f52f254662',
      }
    });
    return next.handle(req);
  }
}


