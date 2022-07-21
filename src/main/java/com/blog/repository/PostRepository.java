package com.blog.repository;

import com.blog.domain.Post;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Post entity.
 */
@Repository
public interface PostRepository extends MongoRepository<Post, String> {
    @Query("{}")
    Page<Post> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<Post> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<Post> findOneWithEagerRelationships(String id);
}
