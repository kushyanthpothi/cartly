package com.tools.program.mcp;

import com.tools.program.entity.Products;
import com.tools.program.service.ProductService;
import org.springaicommunity.mcp.annotation.McpTool;
import org.springaicommunity.mcp.annotation.McpToolParam;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductServiceMcp {
    private final ProductService productService;

    public ProductServiceMcp(ProductService productService) {
        this.productService = productService;
    }
    @McpTool(
            name = "create_product",
            description = "Create a new product with name,description,price,category etc..."
    )
    public Products createProducts(
            @McpToolParam(description = "product_name",required = true) String productName,
            @McpToolParam(description = "product_description",required = true) String productDescription,
            @McpToolParam(description = "product_price",required = true) String productPrice,
            @McpToolParam(description = "product_category",required = true) String productCategory,
            @McpToolParam(description = "product_stock",required = true) int productStock,
            @McpToolParam(description = "product_rating",required = true) float productRating,
            @McpToolParam(description = "product_image_link",required = true) String productImage){

        Products products = new Products(0,productName,productDescription,productPrice,productImage,productCategory,productStock,productRating);
        return productService.createProducts(products);
    }
    @McpTool(
            name = "find_product_by_id",
            description = "Finding product details using it's id"
    )
    public Products findProductById(@McpToolParam(description = "product_id") Long productId){
        return productService.findByProductId(productId);
    }
    @McpTool(
            name = "find_all_products",
            description = "Finding all the products present in the database"
    )
    public List<Products> findAllProducts(){
        return productService.findAllProducts();
    }
    @McpTool(
            name = "find_by_product_category",
            description = "Find the product details based on the product category"
    )
    public List<Products> findByProductCategory(@McpToolParam(description = "product_category",required = true) String productCategory){
        return productService.findByProductCategory(productCategory);
    }
    @McpTool(
            name = "find_by_product_rating",
            description = "Find the product details based on the product rating"
    )
    public List<Products> findbyProductRating(@McpToolParam(description = "product_rating",required = true) float productRating){
        return productService.findByProductRating(productRating);
    }
}
