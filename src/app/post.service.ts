import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogPost } from './BlogPost'
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>(`https://app-blogapi.herokuapp.com/api/posts?page=1&perPage=${Number.MAX_SAFE_INTEGER}`);
  }

  newPost(data: BlogPost): Observable<any> {
    return this.http.post<any>(`https://app-blogapi.herokuapp.com/api/posts`, data);
  }

  updatePostById(id: string, data: BlogPost): Observable<any> {
    return this.http.put<any>(`https://app-blogapi.herokuapp.com/api/posts/${id}`, data);
  }

  deletePostById(id: string): Observable<any>{
    return this.http.delete<any>(`https://app-blogapi.herokuapp.com/api/posts/${id}`);
  }

  getPosts(page,tag,category): Observable<BlogPost[]>{
    const perPage = 6;
    let url = `http://app-blogapi.herokuapp.com/api/posts?page=${page}&perPage=${perPage}`
    if(tag) url += `&tag=${tag}`;
    if(category) url += `&category=${category}`
    
    return this.http.get<BlogPost[]>(url);
  }

  getPostById(id): Observable<BlogPost>{
    return this.http.get<BlogPost>(`http://app-blogapi.herokuapp.com/api/posts/${id}`);
  }

  getCategories(): Observable<any>{
    return this.http.get<any>('http://app-blogapi.herokuapp.com/api/categories/');
  } 

  getTags(): Observable<string[]>{
    return this.http.get<string[]>('http://app-blogapi.herokuapp.com/api/tags/');
  } 
}
