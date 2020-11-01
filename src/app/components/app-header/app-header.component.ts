import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../interfaces/User.interface';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent implements OnInit {
  @Input() public authenticated: boolean;
  @Output() public logout = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  public logOutUser(): void {
    this.logout.emit();
  }
}
