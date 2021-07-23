package ru.baikal.ismu.conf.conf.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.baikal.ismu.conf.conf.repos.UserRepo;

@RestController
@RequestMapping("/checkUser")

public class CheckUserExistRestController {
    @Autowired
    private UserRepo userRepo;

    @GetMapping("{email}")
    public  String userExist(@PathVariable("email") String userEmail){
        if (userRepo.findByUserEmail(userEmail).isPresent()) {
            return "{\"userExist\":1}";

        }
        else return  "{\"userExist\":0}";
    }


}
