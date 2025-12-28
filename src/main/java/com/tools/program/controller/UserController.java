package com.tools.program.controller;

import com.tools.program.entity.Users;
import com.tools.program.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public Users createUser(@RequestBody Users user){
        return userService.createUsers(user);
    }

    @GetMapping
    public List<Users> findAll(){
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public Users getUserById(@PathVariable Long id){
        return userService.getUsersById(id);
    }

    @PatchMapping("/{id}")
    public Users updateUserById(@PathVariable Long id, @RequestBody Users user){
        return userService.updateUserById(id,user);
    }

    @DeleteMapping("/{id}")
    public void deleteUserById(@PathVariable Long id){
        userService.deleteUsersById(id);
    }
}
