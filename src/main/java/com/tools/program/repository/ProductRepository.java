package com.tools.program.repository;

import com.tools.program.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Products, Long> {
    List<Products> findByProductCategory(String productCategory);
    List<Products> findByProductRating(float productRating);
}
