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

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/moderators")
@JsonView(UserView.ForNb.class)
public class ModeratorRestController {
    @Autowired
    UserRepo userRepo;
    @GetMapping
    @JsonView(UserView.ForNb.class)
    public List<User> moderators(@AuthenticationPrincipal User user) {
        List<User> moderatorsList = new ArrayList<>();

        User tempUser =null;

        if (user.getRoles().contains(Roles.ADMIN)) {
            List<User> tempList = userRepo.findAll();
            System.out.println("TEMP_LIST_SIZE="+tempList.size());
            for (int i = 0; i < tempList.size() ; i++) {
                tempUser=tempList.get(i);
                System.out.println(tempUser.getRoles());
                System.out.println(tempUser.getRoles().contains(Roles.MODERATOR));
                    if(tempUser.getRoles().contains(Roles.MODERATOR)) {
                        moderatorsList.add(tempUser);
                    }
                }
            }
        return moderatorsList;
        }


}
