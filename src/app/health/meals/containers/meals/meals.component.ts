import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MealsStoreService } from '../../../store/services/meals.store.service';
import { Meal } from '../../../shared/interfaces/Meal.interface';

@Component({
  selector: 'meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit, OnDestroy {
  public meals$: Observable<Meal[]>;
  constructor(private mealsStoreService: MealsStoreService) { }

  ngOnInit(): void {
    this.mealsStoreService.findAll();
    this.meals$ = this.mealsStoreService.selectAllMeals;
  }

  public onRemoveMeal(meal: Meal): void {
    this.removeMeal(meal);
  }

  private removeMeal(meal: Meal): void {
    this.mealsStoreService.remove(meal.key);
  }

  ngOnDestroy(): void {
  }

}
