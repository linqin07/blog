package com.blog.repository;

import com.blog.domain.Blog;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Blog entity.
 */
@Repository
public interface BlogRepository extends MongoRepository<Blog, String> {
    @Query("{}")
    Page<Blog> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<Blog> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<Blog> findOneWithEagerRelationships(String id);
}
