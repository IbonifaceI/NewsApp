import { makeAutoObservable, action } from "mobx";
import type { Article } from "../../entities/news/types/news";

class NewsStore {
  articles: Article[] = [];
  totalResults = 0;
  page = 1;
  pageSize = 25;
  maxNewsCount = 500;

  constructor() {
    makeAutoObservable(this, {
      setNewsData: action.bound,
      setPage: action.bound,
      setPageSize: action.bound,
    });
  }

  setNewsData(articles: Article[], totalResults: number) {
    this.articles = articles;
    this.totalResults = totalResults > this.maxNewsCount ? this.maxNewsCount : totalResults;
  }

  setPage(page: number) {
    if (page < 1) return;
    this.page = page;
  }

  setPageSize(pageSize: number) {
    if (pageSize < 1) return;
    this.pageSize = pageSize;
  }
}

export const newsStore = new NewsStore();