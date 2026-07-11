import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { getPosts } from '@/utils/posts';
import normalizeAndCleanString from '@/utils/strings';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const lang = searchParams.get('lang') || 'es';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const search = searchParams.get('search') || '';
  const tags = searchParams.get('tags') ? searchParams.get('tags')!.split(',') : [];

  if (!type) {
    return NextResponse.json({ error: 'Type is required' }, { status: 400 });
  }

  let items: any[] = [];

  try {
    if (type === 'post') {
      items = await getPosts(lang);
    } else {
      const filePath = path.join(process.cwd(), 'app', type, 'data.json');
      const fileContents = await fs.readFile(filePath, 'utf8');
      items = JSON.parse(fileContents);
    }
  } catch (error) {
    return NextResponse.json({ error: `Failed to load data for type: ${type}` }, { status: 500 });
  }

  // Filter by tags
  if (tags.length > 0) {
    items = items.filter((item: any) => 
      tags.some((tag) => item.tags && item.tags.includes(tag))
    );
  }

  // Filter by search
  if (search) {
    const normalizedSearch = normalizeAndCleanString(search);
    items = items.filter((item: any) => {
      // Extract all translatable and non-translatable text values for the current item
      const getTextValues = (obj: any): string[] => {
        let values: string[] = [];
        for (const key in obj) {
          const value = obj[key];
          if (typeof value === 'string') {
            values.push(value);
          } else if (typeof value === 'object' && value !== null) {
            if (value.es || value.en) {
              // It's a localized object, take both languages to be thorough, 
              // or just the current one? Usually search should be multilingual or at least match the current lang.
              // Let's take both to ensure we find what the user is looking for regardless of current lang if they search for a specific term.
              if (value.es) values.push(value.es);
              if (value.en) values.push(value.en);
            } else {
              values = values.concat(getTextValues(value));
            }
          }
        }
        return values;
      };

      const itemText = getTextValues(item).join(' ').toLowerCase();
      const normalizedItemText = normalizeAndCleanString(itemText);
      return normalizedItemText.includes(normalizedSearch);
    });
  }

  // Handle visibility if applicable
  items = items.filter((item: any) => item.visible !== false);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / limit);
  const hasMore = page < totalPages;

  const paginatedItems = items.slice((page - 1) * limit, page * limit);

  return NextResponse.json({
    items: paginatedItems,
    metadata: {
      totalItems,
      totalPages,
      currentPage: page,
      hasMore,
    },
  });
}
