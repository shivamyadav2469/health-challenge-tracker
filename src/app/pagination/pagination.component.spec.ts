import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit pageChanged event on page change', () => {
    spyOn(component.pageChanged, 'emit');

    component.currentPage = 2;
    component.totalItems = 20;
    component.itemsPerPage = 5;
    component.changePage(1);

    expect(component.pageChanged.emit).toHaveBeenCalledWith(1);
  });

  it('should emit itemsPerPageChanged event on items per page change', () => {
    spyOn(component.itemsPerPageChanged, 'emit');

    component.itemsPerPage = 5;
    component.changeItemsPerPage({ target: { value: '10' } });

    expect(component.itemsPerPageChanged.emit).toHaveBeenCalledWith(10);
  });
});
