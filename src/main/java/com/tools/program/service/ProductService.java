package com.tools.program.service;

import com.tools.program.entity.Products;
import com.tools.program.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Products createProducts(Products products){
        return productRepository.save(products);
    }

    public Products findByProductId(Long id){
        return productRepository.findById(id).get();
    }

    public List<Products> findAllProducts(){
        return productRepository.findAll();
    }

    public List<Products> findByProductCategory(String productCategory){
        if(productRepository.findByProductCategory(productCategory)==null){
            throw new IllegalArgumentException("Product Category Not Found");
        }
        return productRepository.findByProductCategory(productCategory);
    }

    public List<Products> findByProductRating(float productRating){
        if (productRepository.findByProductRating(productRating)==null){
            throw new IllegalArgumentException("Product Rating Not Found");
        }
        return productRepository.findByProductRating(productRating);
    }

}
