package com.prasna.blogApp.controller;

import com.prasna.blogApp.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping({"/comment/create"})
    public ResponseEntity<?> createComment(@RequestParam Long postId, @RequestParam String postedBy, @RequestBody String content){
        try{
            return ResponseEntity.ok(commentService.createComment(postId,postedBy,content));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @GetMapping({"/comment/{postId}"})
    public ResponseEntity<?> getCommentsByPostId(@PathVariable Long postId){
        try{
            return ResponseEntity.ok(commentService.getCommentsByPostId(postId));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong!");
        }
    }
}
