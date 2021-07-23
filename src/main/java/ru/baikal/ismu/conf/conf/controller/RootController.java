package ru.baikal.ismu.conf.conf.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class RootController {
    @GetMapping("/")
    public String greeting(){
        return  "/greeting";
    }

    @GetMapping("/login")
    public String login(){
        return "/login";
    }

    @GetMapping("/seminars")
    public String seminars(){
        return "/seminars";
    }

    @GetMapping("/registration")
    public String user() {
        return "/registration";
    }

    @GetMapping("/desk")
    public String desk() {
        return "/desk";
    }

    @GetMapping("/tickets")
    public String teckets() {
        return "/tickets";
    }

    @GetMapping("/agreeticket")
    public String agreeticket() {
        return "/agreeticket";
    }

    @GetMapping("/rejectedticket")
    public String rejectedticket() {
        return "/rejectedticket";
    }

    @GetMapping("/tezis")
    public String tezis() {
        return "/tezis";
    }

    @GetMapping("/users")
    public String users() {
        return "/users";
    }

    @GetMapping("/uwt")
    public String uwt() {
        return "/uwt";
    }

    @GetMapping("/success_unsubscrube")
    public String success_unsubscrube() {
        return "/success_unsubscrube";
    }

    @GetMapping("/unsuccess_unsubscrube")
    public String unsuccess_unsubscrube() {
        return "/unsuccess_unsubscrube";
    }
    @GetMapping("/success_req_password")
    public String success_req_password() {
        return "/success_req_password";
    }

    @GetMapping("/unsuccess_req_password")
    public String unsuccess_req_password() {
        return "/unsuccess_req_password";
    }
    @GetMapping("/success_reset_password")
    public String success_reset_password() {
        return "/success_reset_password";
    }

    @GetMapping("/unsuccess_reset_password")
    public String unsuccess_reset_password() {

        return "/unsuccess_reset_password";
    }
    //useragreement
    @GetMapping("/useragreement")
    public String useragreement() {

        return "/useragreement";
    }
    @GetMapping("/report")
    public String report() {

        return "/report";
    }

    @GetMapping("/passwordrequest")
    public String passwordrequest() {
        return "/passwordrequest";
    }

    @GetMapping("/registred")
    public String registred() {
        return "/registred";
    }
    @GetMapping("/politic")
    public String politic() {
        return "/politic";
    }

    @GetMapping("/files")
    public String files(Model model,
                        @RequestParam(defaultValue = "null") String tezisId) {
        model.addAttribute("tezisId", tezisId);
        return "/files";
    }

}
