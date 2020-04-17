/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DessertComponent } from './dessert.component';

describe('DessertComponent', () => {
  let component: DessertComponent;
  let fixture: ComponentFixture<DessertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DessertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DessertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
