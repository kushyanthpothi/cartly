package com.tools.program.mcp;

import com.tools.program.entity.Users;
import com.tools.program.service.UserService;
import org.springaicommunity.mcp.annotation.McpComplete;
import org.springaicommunity.mcp.annotation.McpTool;
import org.springaicommunity.mcp.annotation.McpToolParam;
import org.springframework.stereotype.Component;
import org.stringtemplate.v4.ST;

import java.util.List;

@Component
public class UserServiceMcp {
    private final UserService userService;
    public UserServiceMcp(UserService userService) {
        this.userService = userService;
    }

    @McpTool(
            name = "get-all-users",
            description = "Get all the user details by triggering this"
    )
    public List<Users> getAllUsers(){
        return userService.getAllUsers();
    }

    @McpTool(
            name = "get-user-by-id",
            description = "Get user details using userid"
    )
    public Users getUserById(@McpToolParam(description = "Getting user details by providing id") Long id){
        return userService.getUsersById(id);
    }

    @McpTool(
            name = "delete-users",
            description = "Deleting users by using user id"
    )
    public Users deleteUsersById(@McpToolParam(description = "Deleting user details by providing id",required = true) Long id){
        return userService.deleteUsersById(id);
    }

    @McpTool(
            name = "update-users",
            description = "Updating user details or add new details using user id"
    )
    public Users updateUsersById(Long id,
            @McpToolParam(description = "Update the name based on the user id",required = true) String name,
            @McpToolParam(description = "Update the age based on the user id",required = true) Integer age,
            @McpToolParam(description = "Update the gender field based on the user id",required = true) String gender,
            @McpToolParam(description = "Updating the email field based on the user id",required = true) String email,
            @McpToolParam(description = "Updating the phone number field based on the user id",required = true) String phone
            ){
        Users user = new Users();
        user.setName(name);
        user.setAge(age);
        user.setGender(gender);
        user.setEmail(email);
        user.setPhone(phone);
        return userService.updateUserById(id,user);
    }

}
