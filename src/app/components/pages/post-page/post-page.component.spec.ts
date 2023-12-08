import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPageComponent } from './post-page.component';

describe('PostPageComponent', () => {
  let component: PostPageComponent;
  let fixture: ComponentFixture<PostPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostPageComponent]
    });
    fixture = TestBed.createComponent(PostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
