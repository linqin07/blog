import { IPost } from 'app/entities/post/post.model';

export interface ITag {
  id?: string;
  name?: string;
  entries?: IPost[] | null;
}

export class Tag implements ITag {
  constructor(public id?: string, public name?: string, public entries?: IPost[] | null) {}
}

export function getTagIdentifier(tag: ITag): string | undefined {
  return tag.id;
}
