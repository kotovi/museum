package ru.baikal.ismu.conf.conf.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.baikal.ismu.conf.conf.domain.Roles;
import ru.baikal.ismu.conf.conf.domain.User;
import ru.baikal.ismu.conf.conf.repos.UserRepo;

import java.util.Optional;

@RestController
@RequestMapping("/nav")

public class NavbarRestController {

    @Autowired
    private UserRepo userRepo;

    @GetMapping
    @JsonView(UserView.ForNb.class)
    public Optional<User> userList(@AuthenticationPrincipal User user) {
        Long userId=Long.valueOf(0);
        if (user!=null) {userId = Long.valueOf(user.getId());
            Optional<User>  userForNb = userRepo.findAllById(userId);

            if (user.getRoles().contains(Roles.ADMIN)) {
                userForNb.get().setUserRole(3);
            } else if (user.getRoles().contains(Roles.MODERATOR)) {
                userForNb.get().setUserRole(2);
            } else if (user.getRoles().contains(Roles.USER)) {
                userForNb.get().setUserRole(1);
            }
            return userForNb;
            } else return null;
    }

}

