import { Component } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { IconDefinition, faCopyright, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  faGithub: IconDefinition = faGithub;
  faCopyright: IconDefinition = faCopyright;
  faPaperPlane: IconDefinition = faPaperPlane;
}
