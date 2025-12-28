package com.tools.program.service;

import com.tools.program.entity.cartStatus;
import com.tools.program.repository.CartStatusRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartStatusService {
    private final CartStatusRepository cartStatusRepository;
    public CartStatusService(CartStatusRepository cartStatusRepository) {
        this.cartStatusRepository = cartStatusRepository;
    }

    public List<cartStatus> getCartStatus(){
        return cartStatusRepository.findAll();
    }

    public cartStatus cartStatusById(Long cartId){
        return cartStatusRepository.findById(cartId).get();
    }

    public cartStatus createCartStatus(cartStatus cartStatus){
        return cartStatusRepository.save(cartStatus);
    }

    public cartStatus deleteCartStatus(Long cartId){
        cartStatus cartStatus1 = cartStatusRepository.findById(cartId).orElseThrow(()->new IllegalArgumentException("Cart Id Not found"));

        cartStatusRepository.deleteById(cartId);

        return cartStatus1;
    }

    public cartStatus updateCartStatusbyId(Long cartId, cartStatus cartStatus){
        cartStatus cartStatus1 = cartStatusRepository.findById(cartId).orElseThrow(()->new IllegalArgumentException("Cart Status Not Found"));

        if (cartStatus.getQuantity() != null){
            cartStatus1.setQuantity(cartStatus.getQuantity());
        }
        if (cartStatus.getUserId() != null){
            cartStatus1.setUserId(cartStatus.getUserId());
        }
        if (cartStatus.getProductId() != null){
            cartStatus1.setProductId(cartStatus.getProductId());
        }
        return cartStatusRepository.save(cartStatus1);
    }
}
