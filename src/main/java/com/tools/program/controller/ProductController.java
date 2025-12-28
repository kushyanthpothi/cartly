package com.tools.program.controller;

import com.tools.program.entity.Products;
import com.tools.program.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Products> getAllProducts(){
        return productService.findAllProducts();
    }

    @GetMapping("/{id}")
    public Products getProductById(@RequestParam long id){
        return productService.findByProductId(id);
    }

    @GetMapping("/category/{productCategory}")
    public List<Products> getProductsByCategory(@PathVariable String productCategory){
        return productService.findByProductCategory(productCategory);
    }

    @GetMapping("/rating/{productRating}")
    public List<Products> getProductsByRating(@PathVariable float productRating){
        return productService.findByProductRating(productRating);
    }

    @PostMapping
    public Products createProducts(@RequestBody Products products){
        return productService.createProducts(products);
    }
}
