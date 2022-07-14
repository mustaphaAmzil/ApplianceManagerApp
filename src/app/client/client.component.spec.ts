import { ClientComponent } from './client.component';
import { TestBed } from '@angular/core/testing';
 
describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ClientComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ClientComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'povmanagerapp'`, () => {
    const fixture = TestBed.createComponent(ClientComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('povmanagerapp');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(ClientComponent );
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('povmanagerapp app is running!');
  });
});
