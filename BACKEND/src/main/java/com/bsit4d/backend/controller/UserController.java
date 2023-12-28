package com.bsit4d.backend.controller;

import com.bsit4d.backend.model.LoginHistoryModel;
import com.bsit4d.backend.model.LoginModel;
import com.bsit4d.backend.model.UserModel;
import com.bsit4d.backend.repository.UserRepository;
import com.bsit4d.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserRepository userRepository;
    private SecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();
    private final SecurityContextHolderStrategy securityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy();


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginModel loginModel,
                                        HttpServletRequest request,
                                        HttpServletResponse response) {
        try {
            UserDetails userDetails = userService.loadUserByUsername(loginModel.getUsername());
            UsernamePasswordAuthenticationToken token =
                    new UsernamePasswordAuthenticationToken(loginModel.getUsername(), loginModel.getPassword());

            // Authenticate the user
            Authentication authentication = authenticationManager.authenticate(token);

            // Set the authenticated user in the security context
            SecurityContext context = securityContextHolderStrategy.createEmptyContext();
            context.setAuthentication(authentication);
            securityContextHolderStrategy.setContext(context);
            securityContextRepository.saveContext(context, request, response);
            String tokenGenerated= String.valueOf(token);
            // You may return additional information if needed
            return ResponseEntity.ok("Login successfully");
        } catch (AuthenticationException e) {
            // Handle authentication failure
            return ResponseEntity.ok("Authentication failed: " + e.getMessage());
        }
    }
    @GetMapping("/accountDetails")
    public ResponseEntity<Object> getMyDetails(){
        return ResponseEntity.ok(userRepository.findByIdNumber(Long.valueOf(userService.getLoggedInUserDetails().getUsername())));
    }
    SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();
    @GetMapping("/logoutUser")
    public String performLogout(Authentication authentication, HttpServletRequest request, HttpServletResponse response) {
        this.logoutHandler.logout(request, response, authentication);
        return "logout success";
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody UserModel userModel) {
        return new ResponseEntity<>(userService.registerUser(userModel), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/userList")
    public ResponseEntity getAll() {
        return new ResponseEntity(userService.getAllUsers(), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/get")
    public ResponseEntity getDetailsParam(@RequestParam(required = true) Long idNumber){
        return new ResponseEntity(userService.findDetails(idNumber),HttpStatus.OK);
    }

    @GetMapping("/getId/{idNumber}")
    public ResponseEntity getDetails(@PathVariable("idNumber") Long idNumber){
        return new ResponseEntity(userService.findDetails(idNumber),HttpStatus.OK);
    }

    @GetMapping("/loginHistory")
    public ResponseEntity<List<LoginHistoryModel>> getAllLoginHistory() {
        try {
            List<LoginHistoryModel> loginHistory = userService.findLoginHistory();
            return new ResponseEntity<>(loginHistory, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/officerCount")
    public ResponseEntity<Long> countUsersExcludingAdmin() {
        long count = userService.countUsersExcludingAdmin();
        return ResponseEntity.ok(count);
    }


}