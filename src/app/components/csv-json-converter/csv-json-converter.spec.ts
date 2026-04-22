import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvJsonConverter } from './csv-json-converter';

describe('CsvJsonConverter', () => {
  let component: CsvJsonConverter;
  let fixture: ComponentFixture<CsvJsonConverter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CsvJsonConverter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CsvJsonConverter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
