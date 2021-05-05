import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css'],
})
export class TutorialDetailsComponent implements OnInit {
  message: string = null;

  currentTutorial: Tutorial = {
    title: null,
    description: null,
    published: false,
    deleted: false,
  };

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.message = null;
    this.getTutorial(this.route.snapshot.params.id);
  }

  getTutorial(id: string): void {
    this.tutorialService.get(id).subscribe(
      (data) => {
        this.currentTutorial = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status,
    };

    this.tutorialService.update(this.currentTutorial.id, data).subscribe(
      (response) => {
        this.currentTutorial.published = status;
        this.message = response.message;
        this.router.navigate(['/tutorials']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateTutorial(): void {
    this.tutorialService
      .update(this.currentTutorial.id, this.currentTutorial)
      .subscribe(
        (response) => {
          this.message = response.message;
          this.router.navigate(['/tutorials']);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteTutorial(status: boolean): void {
    console.log(this.currentTutorial.deleted)
    this.tutorialService.delete(this.currentTutorial.id).subscribe(
      () => {
        this.currentTutorial.deleted = status;
        this.router.navigate(['/tutorials']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
