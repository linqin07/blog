import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IBlog, Blog } from '../blog.model';

import { BlogService } from './blog.service';

describe('Blog Service', () => {
  let service: BlogService;
  let httpMock: HttpTestingController;
  let elemDefault: IBlog;
  let expectedResult: IBlog | IBlog[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(BlogService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 'AAAAAAA',
      name: 'AAAAAAA',
      handle: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find('ABC').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Blog', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Blog()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Blog', () => {
      const returnedFromService = Object.assign(
        {
          id: 'BBBBBB',
          name: 'BBBBBB',
          handle: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Blog', () => {
      const patchObject = Object.assign(
        {
          name: 'BBBBBB',
        },
        new Blog()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Blog', () => {
      const returnedFromService = Object.assign(
        {
          id: 'BBBBBB',
          name: 'BBBBBB',
          handle: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Blog', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addBlogToCollectionIfMissing', () => {
      it('should add a Blog to an empty array', () => {
        const blog: IBlog = { id: 'ABC' };
        expectedResult = service.addBlogToCollectionIfMissing([], blog);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(blog);
      });

      it('should not add a Blog to an array that contains it', () => {
        const blog: IBlog = { id: 'ABC' };
        const blogCollection: IBlog[] = [
          {
            ...blog,
          },
          { id: 'CBA' },
        ];
        expectedResult = service.addBlogToCollectionIfMissing(blogCollection, blog);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Blog to an array that doesn't contain it", () => {
        const blog: IBlog = { id: 'ABC' };
        const blogCollection: IBlog[] = [{ id: 'CBA' }];
        expectedResult = service.addBlogToCollectionIfMissing(blogCollection, blog);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(blog);
      });

      it('should add only unique Blog to an array', () => {
        const blogArray: IBlog[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: '587e9e9b-aa2a-4c34-accf-fd324ff9aedd' }];
        const blogCollection: IBlog[] = [{ id: 'ABC' }];
        expectedResult = service.addBlogToCollectionIfMissing(blogCollection, ...blogArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const blog: IBlog = { id: 'ABC' };
        const blog2: IBlog = { id: 'CBA' };
        expectedResult = service.addBlogToCollectionIfMissing([], blog, blog2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(blog);
        expect(expectedResult).toContain(blog2);
      });

      it('should accept null and undefined values', () => {
        const blog: IBlog = { id: 'ABC' };
        expectedResult = service.addBlogToCollectionIfMissing([], null, blog, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(blog);
      });

      it('should return initial array if no Blog is added', () => {
        const blogCollection: IBlog[] = [{ id: 'ABC' }];
        expectedResult = service.addBlogToCollectionIfMissing(blogCollection, undefined, null);
        expect(expectedResult).toEqual(blogCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
