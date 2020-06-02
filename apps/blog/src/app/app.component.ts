import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { shareReplay, map, startWith, tap, share } from 'rxjs/operators';

@Component({
  selector: 'jbb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  navOpend: Observable<boolean>;
  navToggled = new BehaviorSubject(false);

  // todo: refactor to a service
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(1)
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.navOpend = combineLatest([this.isHandset$, this.navToggled]).pipe(
      map(([isHandset, toggled]) => (!isHandset ? true : toggled)),
      shareReplay(1)
    );
  }
  onNavToggle() {
    this.navToggled.next(!this.navToggled.value);
  }
  onBackDropClick() {
    this.navToggled.next(false);
  }
}
