package ru.baikal.ismu.conf.conf.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.baikal.ismu.conf.conf.domain.User;
import ru.baikal.ismu.conf.conf.repos.UserRepo;

import java.util.Optional;

@Controller
@JsonView(UserView.ForNotification.class)
@RequestMapping("/unsubscribe")
public class UnsubscribeController {
    @Autowired
    UserRepo userRepo;
    String redirectUrl;
    @GetMapping("{id}")
    public String Unsubscribe(@PathVariable("id") String id){
        Optional<User> user = userRepo.findByNotificationUUID(id);

        if(user.isPresent()){
            user.get().setNotificationAgree(0);
            userRepo.save(user.get());
            redirectUrl = "redirect:/success_unsubscrube";
            return redirectUrl;
        } else {
            redirectUrl = "redirect:/unsuccess_unsubscrube";
            return redirectUrl;
        }


    }
}
