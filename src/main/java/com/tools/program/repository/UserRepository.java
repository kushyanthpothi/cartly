package com.tools.program.repository;

import com.tools.program.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByEmail(String email);
}
