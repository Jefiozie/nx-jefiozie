import { Injectable } from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

type ScullyRouteWithDescription =
  | ScullyRoute
  | (ScullyRoute & { description: string; date: string; tags: string });
@Injectable()
export class ArticlesService {
  articles$: Observable<
    ScullyRouteWithDescription[]
  > = this.scully.available$.pipe(
    map((routeList) =>
      routeList.filter((router: ScullyRoute) =>
        router.route.includes(`/article/`)
      )
    ),
    map((blogs) => blogs.sort((a, b) => (a.date < b.date ? 1 : -1))),
    shareReplay(1)
  );

  constructor(private scully: ScullyRoutesService) {}
}
