import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UserLogin } from '../../../interfaces/UserLogin.interface';
import { AuthStoreService } from '../../../store/services/auth.store.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public error: Observable<string>;
  constructor(private authStoreService: AuthStoreService) { }

  ngOnInit(): void {
    this.initializeValues();
  }

  public loginUser(event: FormGroup): void {
    const { email, password } = event.value as UserLogin;
    this.authStoreService.logIn(email, password);
  }
  public initializeValues(): void {
    this.error = this.authStoreService.selectUserError.pipe(filter((error) => error.length > 0));
  }
}
