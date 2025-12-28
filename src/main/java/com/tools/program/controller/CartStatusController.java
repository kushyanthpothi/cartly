package com.tools.program.controller;

import com.tools.program.entity.cartStatus;
import com.tools.program.service.CartStatusService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RestController
@RequestMapping("/api/cartStatus")
public class CartStatusController {
    private final CartStatusService cartStatusService;

    public CartStatusController(CartStatusService cartStatusService) {
        this.cartStatusService = cartStatusService;
    }

    @GetMapping
    public List<cartStatus> getCartStatus(){
        return cartStatusService.getCartStatus();
    }

    @PostMapping
    public cartStatus createCartStatus(@RequestBody cartStatus cartStatus){
        return cartStatusService.createCartStatus(cartStatus);
    }

    @GetMapping("/{cartId}")
    public cartStatus getCartStatusById(@PathVariable Long cartId){
        return cartStatusService.cartStatusById(cartId);
    }

    @PatchMapping("/{cartId}")
    public cartStatus updateCartStatusById(@PathVariable Long cartId, @RequestBody cartStatus cartStatus){
        return cartStatusService.updateCartStatusbyId(cartId,cartStatus);
    }

    @DeleteMapping("/{cartId}")
    public void deleteCartStatusById(@PathVariable Long cartId){
        cartStatusService.deleteCartStatus(cartId);
    }
}
