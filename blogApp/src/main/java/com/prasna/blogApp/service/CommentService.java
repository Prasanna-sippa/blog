package com.prasna.blogApp.service;

import com.prasna.blogApp.entity.Comment;

import java.util.List;

public interface CommentService {
     Comment createComment(Long postId, String postedBy, String content);
     List<Comment> getCommentsByPostId(Long postId);
}
