package com.tools.program.service;

import com.tools.program.entity.Users;
import com.tools.program.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Users createUsers(Users users){
        return userRepository.save(users);
    }

    public Users getUsersById(Long id){
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<Users> getAllUsers(){
        return userRepository.findAll();
    }

    public Users deleteUsersById(Long id){
        Users user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        userRepository.deleteById(id);

        return user;
    }

    public Users updateUserById(Long id,Users users){
        Users user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found "+id));
        if (users.getName() != null){
            user.setName(users.getName());
        }
        if (users.getEmail() != null){
            user.setEmail(users.getEmail());
        }
        if (users.getPassword() != null){
            user.setPassword(users.getPassword());
        }
        if (users.getPhone() != null){
            user.setPhone(users.getPhone());
        }
        if (users.getAge() !=null){
            user.setAge(users.getAge());
        }
        if (users.getGender() != null){
            user.setGender(users.getGender());
        }

        return userRepository.save(user);
    }

}
