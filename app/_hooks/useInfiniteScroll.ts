import { useState, useEffect, useCallback, useRef } from 'react';

interface InfiniteScrollOptions<T> {
  type: 'formation' | 'projects' | 'post' | 'experience';
  initialData: T[];
  limit?: number;
  search?: string;
  tags?: string[];
  language: string;
}

interface Metadata {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
}

export function useInfiniteScroll<T>({
  type,
  initialData,
  limit = 10,
  search = '',
  tags = [],
  language,
}: InfiniteScrollOptions<T>) {
  const [items, setItems] = useState<T[]>(initialData);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isFirstRender, setIsFirstRender] = useState(true);
  
  const observerTarget = useRef<HTMLDivElement | null>(null);

  const fetchData = useCallback(
    async (pageNum: number, isReset: boolean = false) => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          type,
          lang: language,
          page: pageNum.toString(),
          limit: limit.toString(),
          search,
          tags: tags.join(','),
        });

        const response = await fetch(`/api/data?${queryParams.toString()}`);
        const data = await response.json();

        if (data.items) {
          setItems((prev) => (isReset ? data.items : [...prev, ...data.items]));
          setHasMore(data.metadata.hasMore);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    },
    [type, language, limit, search, tags]
  );

  // Reset and fetch when filters or language change
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      // Even on first render, if language is not the default, we might want to re-fetch.
      // But the plan says server component defaults to Spanish.
      // If client preference is different, we re-fetch.
      if (language !== 'es') {
        fetchData(1, true);
        setPage(1);
      }
      return;
    }

    setItems([]);
    setPage(1);
    setHasMore(true);
    fetchData(1, true);
  }, [search, tags, language]);

  // Load more when page changes (triggered by IntersectionObserver)
  useEffect(() => {
    if (page > 1) {
      fetchData(page);
    }
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loading]);

  return {
    items,
    loading,
    hasMore,
    observerTarget,
  };
}
