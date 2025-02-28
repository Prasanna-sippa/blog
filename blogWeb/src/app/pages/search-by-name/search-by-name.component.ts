// import { Component } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { PostService } from 'src/app/service/post.service';

// @Component({
//   selector: 'app-search-by-name',
//   templateUrl: './search-by-name.component.html',
//   styleUrls: ['./search-by-name.component.scss']
// })
// export class SearchByNameComponent {
//     result: any= [];
//     name:any ="";

//     constructor(private postService: PostService,
//       private snackBar: MatSnackBar){}

//       searchByName(){
//         this.postService.searchByName(this.name).subscribe(res=>{
//           this.result = res;
//           console.log(this.result);
//         },error =>{
//           this.snackBar.open("something went wrong!","ok");
//         })
//       }


// }

//chatgpt
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/service/post.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-by-name',
  templateUrl: './search-by-name.component.html',
  styleUrls: ['./search-by-name.component.scss']
})
export class SearchByNameComponent implements OnInit {
  searchControl = new FormControl('');
  result: any[] = [];

  constructor(
    private postService: PostService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(600), // Wait for 300ms pause in events
        distinctUntilChanged() // Only emit if value is different from before
      )
      .subscribe((name) => {
        if (name) {
          this.postService.searchByName(name).subscribe(
            (res) => {
              this.result = res;
              this.searchControl.reset(); // Clear the input field
            },
            (error) => {
              this.snackBar.open('Something went wrong!', 'OK');
            }
          );
        }
        //  else {
        //   this.result = []; // Clear results if input is empty
        // }
      });
  }
}
