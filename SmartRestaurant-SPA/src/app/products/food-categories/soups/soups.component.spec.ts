/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SoupsComponent } from './soups.component';

describe('SoupsComponent', () => {
  let component: SoupsComponent;
  let fixture: ComponentFixture<SoupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
