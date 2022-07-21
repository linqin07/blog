package com.blog.service.impl;

import com.blog.domain.Blog;
import com.blog.repository.BlogRepository;
import com.blog.service.BlogService;
import com.blog.service.dto.BlogDTO;
import com.blog.service.mapper.BlogMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link Blog}.
 */
@Service
public class BlogServiceImpl implements BlogService {

    private final Logger log = LoggerFactory.getLogger(BlogServiceImpl.class);

    private final BlogRepository blogRepository;

    private final BlogMapper blogMapper;

    public BlogServiceImpl(BlogRepository blogRepository, BlogMapper blogMapper) {
        this.blogRepository = blogRepository;
        this.blogMapper = blogMapper;
    }

    @Override
    public BlogDTO save(BlogDTO blogDTO) {
        log.debug("Request to save Blog : {}", blogDTO);
        Blog blog = blogMapper.toEntity(blogDTO);
        blog = blogRepository.save(blog);
        return blogMapper.toDto(blog);
    }

    @Override
    public BlogDTO update(BlogDTO blogDTO) {
        log.debug("Request to save Blog : {}", blogDTO);
        Blog blog = blogMapper.toEntity(blogDTO);
        blog = blogRepository.save(blog);
        return blogMapper.toDto(blog);
    }

    @Override
    public Optional<BlogDTO> partialUpdate(BlogDTO blogDTO) {
        log.debug("Request to partially update Blog : {}", blogDTO);

        return blogRepository
            .findById(blogDTO.getId())
            .map(existingBlog -> {
                blogMapper.partialUpdate(existingBlog, blogDTO);

                return existingBlog;
            })
            .map(blogRepository::save)
            .map(blogMapper::toDto);
    }

    @Override
    public List<BlogDTO> findAll() {
        log.debug("Request to get all Blogs");
        return blogRepository.findAll().stream().map(blogMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    public Optional<BlogDTO> findOne(String id) {
        log.debug("Request to get Blog : {}", id);
        return blogRepository.findById(id).map(blogMapper::toDto);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Blog : {}", id);
        blogRepository.deleteById(id);
    }
}
