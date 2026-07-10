import { Index } from 'flexsearch';

export interface SearchResult {
  id: string;
  title: string;
  type: 'post' | 'project';
  slug: string;
  content: string;
}

let index: Index | null = null;
let dataStore: Record<string, SearchResult> = {};

export function initSearchIndex(items: SearchResult[]) {
  index = new Index({
    tokenize: 'forward',
    optimize: true,
  });

  items.forEach((item) => {
    index?.add(item.id, `${item.title} ${item.content}`);
    dataStore[item.id] = item;
  });
}

export function search(query: string): SearchResult[] {
  if (!index) return [];
  const results = index.search(query);
  return results.map((id) => dataStore[id as string]);
}

export function createSnippet(content: string, query: string, length: number = 100): string {
  const index = content.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return content.slice(0, length) + '...';

  const start = Math.max(0, index - length / 2);
  const end = Math.min(content.length, index + length / 2);
  let snippet = content.slice(start, end);
  
  if (start > 0) snippet = '...' + snippet;
  if (end < content.length) snippet = snippet + '...';
  
  return snippet;
}
