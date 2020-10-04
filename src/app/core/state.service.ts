import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  address: any;
}
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export type Info = {
  likes: number;
  hashtags: string[];
};
export type PostUnion = Post & Info;

const TAGS = [
  'angular',
  'blazor',
  'react',
  'vue',
  'typescript',
  '.net c#',
  'jsx',
  'javascript',
  'XE',
  'framework',
];

function generateFakeLikesNTags() {
  let INFOS: { [id: string]: Info };

  INFOS = Array(100)
    .fill(1)
    .reduce((infos, _, i) => {
      let postId = String(1 + i);
      let ids = (i / 10).toFixed(2);
      let info = {
        likes: (i % 10) * 5,
        hashtags: [
          ...new Set([TAGS[ids[0]], TAGS[ids[2]], TAGS[ids[3]]]).values(),
        ],
      };
      infos[postId] = info; //INFOS[post.id] = { likes: 0-45, hashtags: [2/3 TAG univoci]}
      return infos;
    }, {});
  return INFOS;
}

@Injectable({ providedIn: 'root' })
export class StateService {
  constructor() {}

  dispatchUserInfo(info: User) {
    localStorage.setItem('user', JSON.stringify(info));
  }
  getUserInfo(): Observable<User> {
    return of(JSON.parse(localStorage.getItem('user')));
  }

  dispatchPostNlikesNtags(posts: Post[]) {
    const infos = generateFakeLikesNTags();
    localStorage.setItem(
      'INFO',
      JSON.stringify(
        posts.map((p) => ({
          userId: p.userId,
          id: p.id,
          title: p.title,
          body: p.body,
          likes: infos[p.id].likes,
          hashtags: infos[p.id].hashtags,
        }))
      )
    );
  }
  reset() {
    localStorage.clear();
  }
}
