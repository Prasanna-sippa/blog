package com.prasna.blogApp.controller;

import com.prasna.blogApp.entity.Post;
import com.prasna.blogApp.service.PostService;
import com.prasna.blogApp.service.PostServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class PostController {

    @Autowired
    private PostService postService;
    @PostMapping({"/post/create"})
    public ResponseEntity<?> createPost(@RequestBody Post post){
        return ResponseEntity.status(HttpStatus.CREATED).body(postService.savePost(post));
    }
    @GetMapping({"/post/getAll"})
    public ResponseEntity<List<Post>> getAllPosts(){
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.status(HttpStatus.OK).body(posts);
    }
    @GetMapping("/post/getPost/{postId}")
    public ResponseEntity<?> gePostById(@PathVariable Long postId){
        try{
            Post post = postService.getPostById(postId);
            return  ResponseEntity.ok(post);
        }catch (EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @PutMapping({"/post/like/{postId}"})
    public ResponseEntity<?> likePost(@PathVariable Long postId){
        try{
            postService.likePost(postId);
            return  ResponseEntity.ok(new String[]{"Post liked successfully!"});
        }catch (EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    @GetMapping({"/post/search/{name}"})
    public ResponseEntity<?> searchByName(@PathVariable String name){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(postService.searchByName(name));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }





}
