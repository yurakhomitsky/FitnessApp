import { Component, OnInit } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { UserLogin } from '../../../interfaces/UserLogin.interface';
import { AuthStoreService } from '../../../store/services/auth.store.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public error: Observable<string>;
  constructor(private authStoreService: AuthStoreService) { }

  ngOnInit(): void {
    this.initializeValues();
  }

  public registerUser(event: FormGroup): void {
    const { email, password } = event.value as UserLogin;
    this.authStoreService.signUp(email, password);
  }

  public initializeValues(): void {
    this.error = this.authStoreService.selectUserError.pipe(filter((error) => error.length > 0));
  }
}
