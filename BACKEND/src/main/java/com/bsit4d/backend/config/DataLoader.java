package com.bsit4d.backend.config;

// DataLoader.java
import com.bsit4d.backend.model.UserModel;
import com.bsit4d.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Check if the user already exists
        if (userRepository.findByIdNumber(Long.parseLong("202010372")).isEmpty()) {
            // If not, insert a new user
            UserModel user = new UserModel();
            user.setIdNumber(Long.parseLong("202010372"));
            user.setRole("ADMIN");
            user.setStatus("ACTIVE");
            user.setFirstName("Clyde");
            user.setMiddleName("S");
            user.setLastName("Solas");
            user.setPassword(passwordEncoder.encode("1234"));
            userRepository.save(user);
        }
        if (userRepository.findByIdNumber(Long.parseLong("202010373")).isEmpty()) {
            // If not, insert a new user
            UserModel user = new UserModel();
            user.setIdNumber(Long.parseLong("202010373"));
            user.setRole("TREASURER");
            user.setStatus("ACTIVE");
            user.setFirstName("Clyde");
            user.setMiddleName("S");
            user.setLastName("Solas");
            user.setPassword(passwordEncoder.encode("1234"));
            userRepository.save(user);
        }
        if (userRepository.findByIdNumber(Long.parseLong("202010374")).isEmpty()) {
            // If not, insert a new user
            UserModel user = new UserModel();
            user.setIdNumber(Long.parseLong("202010374"));
            user.setRole("AUDITOR");
            user.setStatus("ACTIVE");
            user.setFirstName("Clyde");
            user.setMiddleName("S");
            user.setLastName("Solas");
            user.setPassword(passwordEncoder.encode("1234"));
            userRepository.save(user);
        }
        if (userRepository.findByIdNumber(Long.parseLong("202010375")).isEmpty()) {
            // If not, insert a new user
            UserModel user = new UserModel();
            user.setIdNumber(Long.parseLong("202010375"));
            user.setRole("OTHER_OFFICER");
            user.setStatus("ACTIVE");
            user.setFirstName("Clyde");
            user.setMiddleName("S");
            user.setLastName("Solas");
            user.setPassword(passwordEncoder.encode("1234"));
            userRepository.save(user);
        }
    }
}

