import type { BlogPost } from './legacy-data.service';

export const HASHNODE_RSS_URL = 'https://gdgsiliguri.hashnode.dev/rss.xml';
export const BLOG_FEED_PROXY_PATH = '/blog-feed.xml';

const WORDS_PER_MINUTE = 200;
const GDG_SILIGURI_AVATAR =
  'https://cdn.hashnode.com/res/hashnode/image/upload/v1733982772467/ea62c28a-0cd1-47b5-ba3b-636d79780f4b.jpeg';

const XML_ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
};

function decodeEntities(value: string): string {
  return value.replace(/&(amp|lt|gt|quot|apos|#39);/g, (entity) => XML_ENTITIES[entity]);
}

function unwrapCdata(value: string): string {
  return value.replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, '$1');
}

function readTag(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return match ? decodeEntities(unwrapCdata(match[1])).trim() : '';
}

function readEnclosureUrl(xml: string): string {
  return xml.match(/<enclosure[^>]*\surl="([^"]+)"/)?.[1] ?? '';
}

function estimateReadTime(html: string): number {
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function parseItem(item: string): BlogPost {
  const content = readTag(item, 'content:encoded');
  const metadata = item.replace(/<content:encoded>[\s\S]*?<\/content:encoded>/, '');
  const url = readTag(metadata, 'link');

  return {
    id: readTag(metadata, 'guid') || url,
    title: readTag(metadata, 'title'),
    brief: readTag(metadata, 'description'),
    slug: url.split('/').pop() ?? '',
    coverImage: { url: readEnclosureUrl(metadata) },
    publishedAt: readTag(metadata, 'pubDate'),
    author: {
      name: readTag(metadata, 'dc:creator') || 'GDG Siliguri',
      profilePicture: GDG_SILIGURI_AVATAR,
    },
    readTimeInMinutes: estimateReadTime(content),
    url,
  };
}

export function parseHashnodeRss(xml: string): BlogPost[] {
  return Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g), (match) => parseItem(match[1]));
}
