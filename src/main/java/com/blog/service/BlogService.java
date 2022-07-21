package com.blog.service;

import com.blog.service.dto.BlogDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.blog.domain.Blog}.
 */
public interface BlogService {
    /**
     * Save a blog.
     *
     * @param blogDTO the entity to save.
     * @return the persisted entity.
     */
    BlogDTO save(BlogDTO blogDTO);

    /**
     * Updates a blog.
     *
     * @param blogDTO the entity to update.
     * @return the persisted entity.
     */
    BlogDTO update(BlogDTO blogDTO);

    /**
     * Partially updates a blog.
     *
     * @param blogDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<BlogDTO> partialUpdate(BlogDTO blogDTO);

    /**
     * Get all the blogs.
     *
     * @return the list of entities.
     */
    List<BlogDTO> findAll();

    /**
     * Get the "id" blog.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<BlogDTO> findOne(String id);

    /**
     * Delete the "id" blog.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
