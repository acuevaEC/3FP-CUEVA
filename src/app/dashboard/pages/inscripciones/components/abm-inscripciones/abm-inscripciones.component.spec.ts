import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmInscripcionesComponent } from './abm-inscripciones.component';

describe('AbmInscripcionesComponent', () => {
  let component: AbmInscripcionesComponent;
  let fixture: ComponentFixture<AbmInscripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmInscripcionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbmInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
