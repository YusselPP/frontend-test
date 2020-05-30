import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SearchBarComponent } from './search-bar.component';
import { FormsModule } from '@angular/forms';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      imports: [FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a search input', () => {
    expect(
      fixture.debugElement.query(By.css('input[type="search"]'))
    ).toBeTruthy();
  });

  it('should emit queryChange event on input text changes', () => {
    const searchPhrase = 'search phrase';
    spyOn(component.queryChange, 'emit');

    const inputEle = fixture.debugElement.query(By.css('input[type="search"]'))
      .nativeElement;
    inputEle.value = searchPhrase;
    inputEle.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.queryChange.emit).toHaveBeenCalledWith(searchPhrase);
  });
});
