package com.blog.repository;

import com.blog.domain.Blog;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Blog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BlogRepository extends MongoRepository<Blog, String> {}
