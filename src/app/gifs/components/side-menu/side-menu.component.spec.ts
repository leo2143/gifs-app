import { TestBed } from '@angular/core/testing';
import { computed, signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { SideMenuComponent } from './side-menu.component';
import { GifsService } from '../../../services/gifs.service';

describe('SideMenuComponent history', () => {
  let searchHistory: ReturnType<typeof signal<Record<string, unknown[]>>>;

  beforeEach(() => {
    searchHistory = signal<Record<string, unknown[]>>({});
    TestBed.configureTestingModule({
      imports: [SideMenuComponent],
      providers: [
        provideRouter([]),
        {
          provide: GifsService,
          useValue: {
            searchHistoryKeys: computed(() => Object.keys(searchHistory())),
          },
        },
      ],
    });
  });

  it('shows history keys after search', () => {
    const fixture = TestBed.createComponent(SideMenuComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).not.toContain('dog');

    searchHistory.update((history) => ({ ...history, dog: [] }));
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('dog');
  });
});
