import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createNewPost(data: any): Observable<any>{
    return this.http.post(BASIC_URL + 'post/create', data);
  }

  getAllPosts(): Observable<any>{
    return this.http.get(BASIC_URL + 'post/getAll');
  }

  getPostById(postId: number): Observable<any>{
    return this.http.get(BASIC_URL + `post/getPost/${postId}`);
  }
  likePost(postId: number): Observable<any>{
    return this.http.put(BASIC_URL + `post/like/${postId}`,{});
  }

  searchByName(name: string): Observable<any>{
    return this.http.get(BASIC_URL + `post/search/${name}`);
  }
}
