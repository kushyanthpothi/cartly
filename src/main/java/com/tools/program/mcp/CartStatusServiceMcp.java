package com.tools.program.mcp;

import com.tools.program.entity.cartStatus;
import com.tools.program.service.CartStatusService;
import org.springaicommunity.mcp.annotation.McpTool;
import org.springaicommunity.mcp.annotation.McpToolParam;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CartStatusServiceMcp {
    private final CartStatusService cartStatusService;
    public CartStatusServiceMcp(CartStatusService cartStatusService) {
        this.cartStatusService = cartStatusService;
    }
    @McpTool(
            name = "add-product-to-cart",
            description = "Here this is used to add the product to the cart for the particular user"
    )
    public cartStatus createCartStatus(
            @McpToolParam(description = "this is for adding product id",required = true) int productId,
            @McpToolParam(description = "this is for adding quantity",required = true) int quantity,
            @McpToolParam(description = "this is for adding user id",required = true) int userId
    ) {
        cartStatus cartStatus = new cartStatus(null,userId,productId,quantity);
        return cartStatusService.createCartStatus(cartStatus);
    }

    @McpTool(
            name = "get-cart-by-id",
            description = "Get details of the cart by cart id"
    )

    public cartStatus getCartStatusById(@McpToolParam(description = "provide cart id to get the information",required = true) Long cartId) {
        return cartStatusService.cartStatusById(cartId);
    }

    @McpTool(
            name = "delete-from-cart",
            description = "Deleting items from the cart using cart id"
    )

    public cartStatus deleteCartStatusById(@McpToolParam(description = "providing cart id to remove the items from the cart",required = true)Long cartId) {
        return cartStatusService.deleteCartStatus(cartId);
    }

    @McpTool(
            name = "update-cart-by-id",
            description = "Updating the details in the cart using cart id"
    )

    public cartStatus updateCartStatusById(
            @McpToolParam(description = "Provide cart id to update the details in the cart",required = true) Long cartId,
            @McpToolParam(description = "this is for adding product id",required = true) int productId,
            @McpToolParam(description = "this is for adding quantity",required = true) int quantity,
            @McpToolParam(description = "this is for adding user id",required = true) int userId
    ) {

        cartStatus cartStatus = new cartStatus();
        cartStatus.setProductId(productId);
        cartStatus.setQuantity(quantity);
        cartStatus.setUserId(userId);
        return cartStatusService.updateCartStatusbyId(cartId,cartStatus);
    }

    @McpTool(
            name = "get-all-cart-details",
            description = "Get all the cart of all the different users"
    )

    public List<cartStatus> getAllCartStatus(){
        return cartStatusService.getCartStatus();
    }
}
