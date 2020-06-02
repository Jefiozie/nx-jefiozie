import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export interface GithubRepos {
  id: string;
  name: string;
  description: string;

  url: string;
  clone: boolean;
  homepage: string;

  stars: number;
  forks: number;
  owner: {
    id: number;
    type: string;
    name: string;

    url: string;
    avatar: string;
  };
}

@Injectable({ providedIn: 'root' })
export class GithubService {
  private REPOS = ['ngx-aws-deploy', 'xlayers', 'xlayers-vscode-extenstion'];
  repositories$: Observable<GithubRepos[]> = this.httpClient
    .get<GithubRepos[]>(`./assets/projects.json`)
    .pipe(
      map((repos) => repos.filter((repo) => this.REPOS.includes(repo.name))),
      shareReplay(1)
    );

  constructor(private httpClient: HttpClient) {}
}
