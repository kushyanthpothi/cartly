package com.tools.program.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "products")
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;

    private String productName;

    @Column(columnDefinition = "TEXT")
    private String productDescription;

    private String productPrice;
    private String productImage;
    private String productCategory;
    private int productStock;
    private float productRating;

}
