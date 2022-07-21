import dayjs from 'dayjs/esm';
import { IBlog } from 'app/entities/blog/blog.model';
import { ITag } from 'app/entities/tag/tag.model';

export interface IPost {
  id?: string;
  title?: string;
  content?: string;
  date?: dayjs.Dayjs;
  blog?: IBlog | null;
  tags?: ITag[] | null;
}

export class Post implements IPost {
  constructor(
    public id?: string,
    public title?: string,
    public content?: string,
    public date?: dayjs.Dayjs,
    public blog?: IBlog | null,
    public tags?: ITag[] | null
  ) {}
}

export function getPostIdentifier(post: IPost): string | undefined {
  return post.id;
}
