package ru.baikal.ismu.conf.conf.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.baikal.ismu.conf.conf.domain.Roles;
import ru.baikal.ismu.conf.conf.domain.User;
import ru.baikal.ismu.conf.conf.repos.UserWithoutTezisRepo;
import java.util.List;

@RestController
@RequestMapping("/userswithouttezis")
public class UsersWithoutTezisRestController {
    @Autowired
    private UserWithoutTezisRepo userWithoutTezisRepo;
    @GetMapping
    @JsonView(UserView.ForUserList.class)
    public List<User> list(@AuthenticationPrincipal User user){

        if(user.getRoles().contains(Roles.ADMIN)){
            List<User> ufs = userWithoutTezisRepo.userWithoutTezis();
            return ufs;
        } else return null;
    }

}
