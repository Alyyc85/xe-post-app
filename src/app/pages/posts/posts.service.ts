import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StateService } from 'src/app/core/state.service';

@Injectable()
export class PostsService {
  constructor(private http: HttpClient, private stateSrv: StateService) {}
}
