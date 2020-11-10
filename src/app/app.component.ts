import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth/shared/services/auth/auth.service';
import { AuthStoreService } from './auth/store/services/auth.store.service';
import { shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-project-fit';

  public authenticated$: Observable<boolean>;
  private subscription: Subscription;

  constructor(private authService: AuthService, private authStoreService: AuthStoreService) { }

  ngOnInit(): void {
    this.authStoreService.getCurrentUser();
    this.authenticated$ = this.authStoreService.selectUserAuthenticated.pipe(shareReplay());
  }

  public onLogout(): void {
    this.authService.logOutUser();
  }

  ngOnDestroy(): void { }
}
