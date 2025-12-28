package com.tools.program.repository;

import com.tools.program.entity.cartStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartStatusRepository extends JpaRepository <cartStatus, Long> {
}
