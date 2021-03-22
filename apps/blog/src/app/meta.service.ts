import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ScullyRoute } from '@scullyio/ng-lib';

export interface Frontmatter extends ScullyRoute {
  description?: string;
  date?: string;
  tags?: string[];
  url?: string;
  readingTime?: number;
}

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  private _defaultImage =
    'https://avatars.githubusercontent.com/u/17835373?s=460&u=c0c994330619b3b0273a377d0d750a069fc066a8&v=4';

  constructor(
    private readonly meta: Meta,
    private readonly title: Title,
    @Inject(DOCUMENT) private readonly dom: Document
  ) {}

  update(front: Frontmatter) {
    this.title.setTitle(MetaService.getTitle(front.title));

    this.meta.updateTag({
      property: 'og:title',
      content: front.title,
    });

    this.meta.updateTag({
      name: 'twitter:title',
      content: front.title,
    });

    this.meta.updateTag({
      name: 'twitter:description',
      content: front.description,
    });

    this.meta.updateTag({
      property: 'og:description',
      content: front.description,
    });

    this.meta.updateTag({
      name: 'description',
      content: front.description,
    });

    this.meta.updateTag({
      property: 'og:url',
      content: front.url,
    });

    if (front.tags?.length) {
      this.meta.updateTag({ name: 'keywords', content: front.tags.join(', ') });
    }

    this.meta.updateTag({
      name: 'twitter:image',
      content: front.image || this._defaultImage,
    });

    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary',
    });

    this.meta.updateTag({
      name: 'twitter:creator',
      content: 'jefiozie',
    });

    this.meta.updateTag({
      property: 'og:image',
      content: front.image || this._defaultImage,
    });

    this.updateCanonical(front.url);
  }

  updateTagTitle(tagName: string) {
    this.resetMeta();
    this.title.setTitle(MetaService.getTitle(tagName));
  }

  resetMeta() {
    this.meta.removeTag("property='og:title'");
    this.meta.removeTag("property='og:description'");
    this.meta.removeTag("property='og:url'");
    this.meta.removeTag("name='twitter:title'");
    this.meta.removeTag("name='twitter:description'");
    this.meta.removeTag("name='keywords'");

    this.meta.updateTag({
      name: 'description',
      content: 'Personal blog by Jeffrey Bosch',
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: this._defaultImage,
    });

    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary',
    });

    this.meta.updateTag({
      name: 'twitter:creator',
      content: 'jefiozie',
    });

    this.meta.updateTag({
      property: 'og:image',
      content: this._defaultImage,
    });
    this.title.setTitle('Jeffrey Bosch');
    this.updateCanonical();
  }

  private static getTitle(title: string) {
    return `${title} | Jeffrey Bosch`;
  }

  private updateCanonical(url: string = 'https://jefiozie.github.io') {
    let head = this.dom.querySelector('head');
    if (head != null && Array.isArray(head)) {
      head = head[0];
    }
    let element: HTMLLinkElement =
      this.dom.querySelector(`link[rel='canonical']`) || null;
    if (!element) {
      element = this.dom.createElement('link') as HTMLLinkElement;
      head?.appendChild(element);
    }
    element.setAttribute('rel', 'canonical');
    element.setAttribute('href', url);
  }
}
