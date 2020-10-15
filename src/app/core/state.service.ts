import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

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

/**
 * finto generatore di informazioni
 * da unire ai post
 *
 * @returns
 */
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
/**
 * Servizio singleton dell'app per gestire uno
 * "stato" dell'applicazione
 *
 * Per non usare librerie è stato utilizzato
 * direttamente il localStorage per la cache
 *
 * @export
 * @class StateService
 */
@Injectable({ providedIn: 'root' })
export class StateService {
  private _posts$ = new BehaviorSubject<PostUnion[]>([]);
  constructor() {
    const cachedInfo = localStorage.getItem('INFO');
    if (cachedInfo) {
      this._posts$.next(JSON.parse(cachedInfo));
    }
  }
  /**
   * Finto e filosoficamente inesatto
   * dispatch e cache delle informazioni di un utente
   * volto solo a abbellire l'app
   * Le informazioni sono diramate con il `getUserInfo()`
   *
   * @param User info
   * @memberof StateService
   */
  dispatchUserInfo(info: User) {
    localStorage.setItem('user', JSON.stringify(info));
  }
  getUserInfo(): Observable<User> {
    return of(JSON.parse(localStorage.getItem('user')));
  }
  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  /**
   * Alla login carico già tutti i post
   * perchè posso accedere ai post senza
   * o con autenticazione
   * passo i post della chiamata API a questo
   * metodo che li unisce alle info
   * e li salva la prima volta nello "stato"
   * ora semplificato con il localStorage
   *
   * @param Post[] posts
   * @memberof StateService
   */
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
    this._posts$.next(JSON.parse(localStorage.getItem('INFO')));
  }

  /**
   * La source of truth dei post combinati
   * e cachati nel localStorage
   *
   * @returns `Observable<PostUnion[]>`
   * @memberof StateService
   */
  getPosts(): Observable<PostUnion[]> {
    return this._posts$.asObservable();
  }
  /**
   * Metodo di manipolazione dei post
   * Aggiorna la variabile interna che notificherà chi
   * è in ascolto e riscrive la cache per l'F5
   *
   * @param PostUnion[] posts
   * @memberof StateService
   */
  updatePosts(posts: PostUnion[]) {
    this._posts$.next(posts);
    localStorage.setItem('INFO', JSON.stringify(posts));
  }
  /**
   * Pulisce il localStorage alla creazione dell'istanza
   * del LoginComponent
   *
   * @memberof StateService
   */
  reset() {
    localStorage.clear();
  }
}
