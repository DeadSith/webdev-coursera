import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { visibility , flyInOut , expand } from '../animations/app.animation';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
    animations: [
      flyInOut(),
      visibility(),
      expand()
    ]
})

export class DishdetailComponent implements OnInit {

    @ViewChild('ffform') commentFormDirective;
    
    dish: Dish;
    dishcopy = null;
    dishIds: number[];
    prev: number;
    next: number;
    commentForm: FormGroup;
    comment: Comment;
    errMess: string;
    visibility = 'shown';
    
    formErrors = {
      'author': '',
      'comment': ''
      };
    validationMessages = {
      'author': {
        'required':      'Author Name is required.',
        'minlength':     'Author Name must be at least 2 characters long.'
      },
      'comment': {
        'required':      'Comment is required.',
      },
    };      
      
 


    constructor(private dishservice: DishService,
        private route: ActivatedRoute,
        private location: Location,
        private fbl: FormBuilder,
        @Inject('BaseURL') private BaseURL) {
            this.createForm();
         }

    ngOnInit() {
        this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
        this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); }))
        .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
          errmess => this.errMess = <any>errmess);
    }
        
    setPrevNext(dishId: number) {
        const index = this.dishIds.indexOf(dishId);
        this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
        this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }    
          

    goBack(): void {
        this.location.back();
    }

    createForm() {
        this.commentForm = this.fbl.group({
          author: ['', [Validators.required, Validators.minLength(2)]],
          rating: 5,
          comment: ['', [Validators.required]]
        });
    
        this.commentForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    
         this.onValueChanged(); // (re)set validation messages now
    
      }
    
      onValueChanged(data?: any) {
        if (!this.commentForm) { return; }
        const form = this.commentForm;
        for (const field in this.formErrors) {
          if (this.formErrors.hasOwnProperty(field)) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
              const messages = this.validationMessages[field];
              for (const key in control.errors) {
                if (control.errors.hasOwnProperty(key)) {
                  this.formErrors[field] += messages[key] + ' ';
                }
              }
            }
          }
        }
      }
      
      onSubmit() {
        this.comment = this.commentForm.value;
        this.comment.date = new Date().toISOString();
        console.log(this.comment);
        this.dish.comments.push(this.comment);
        this.commentFormDirective.resetForm({
          author: '',
          rating :5,
          comment: ''
        });

        this.dishcopy.comments.push(this.comment);
        this.dishcopy.save()
        .subscribe(dish => { this.dish = dish; console.log(this.dish); });
       
      }
    
  }