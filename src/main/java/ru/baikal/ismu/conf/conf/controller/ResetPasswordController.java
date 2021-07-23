package ru.baikal.ismu.conf.conf.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.baikal.ismu.conf.conf.domain.Notification;
import ru.baikal.ismu.conf.conf.domain.User;
import ru.baikal.ismu.conf.conf.repos.NotificationRepo;
import ru.baikal.ismu.conf.conf.repos.UserRepo;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import static ru.baikal.ismu.conf.conf.domain.Roles.USER;


@Controller
@JsonView(UserView.ForNotification.class)
@RequestMapping("/resetpassword")
public class ResetPasswordController {
    @Autowired
    UserRepo userRepo;
    @Autowired
    private NotificationRepo notificationRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    String redirectUrl;
    @GetMapping("{uuid}")
    public String Resetpassword(@PathVariable("uuid") String uuid, Notification notification){
        Optional<User> user = userRepo.findByPasswordUUID(uuid);

        if(user.isPresent()){

            String paswd = generateCommonLangPassword();

            user.get().setPassword(passwordEncoder.encode(paswd));
            notification.setNotificationRecipient(user.get().getUserEmail());
            notification.setNotificationSubject("Новый пароль для авторизации на сайте");
            notification.setNotificationBody(
                    "Здравствуйте," +user.get().getLastname()+" "+user.get().getFirstname()+" "+user.get().getSecname()+"! \n" +
                            "Вы зарегистрированы в качестве участника конференции «Актуальные тенденции современной стоматологии»! \n" +
                            "Вами был сделан запрос на сброс пароля для доступа к системе! \n" +
                            "Для просмотра материалов конференции Вам необходимо авторизоваться со следующими учетными данными:" +
                            "\n Логин: "+ user.get().getUsername()+" " +
                            "\n Пароль: " +paswd+" "+
                            "\n \n Это письмо было отправлено Вам, так как адрес "+ user.get().getUserEmail()+" был указан при регистрации на https://stom.ismu.baikal.ru"+" "+
                            "\n \n Для отказа от получения уведомлений перейдите по ССЫЛКЕ: https://stom.ismu.baikal.ru/unsubscribe/"+user.get().getNotificationUUID());
            notification.setCreateNotificationDateTime(LocalDateTime.now());

            notification.setNotificationStatus(0);
            notification.setSourceId(user.get().getId());
            notification.setUnsubscribeUUID(user.get().getNotificationUUID());

            notification.setSourceId(user.get().getId());
            notificationRepo.save(notification);
            redirectUrl = "redirect:/success_reset_password";
            return redirectUrl;
        } else {
            redirectUrl = "redirect:/unsuccess_reset_password";
            return redirectUrl;
        }


    }
    public String generateCommonLangPassword() {
        String upperCaseLetters = RandomStringUtils.random(2, 65, 90, true, true);
        String lowerCaseLetters = RandomStringUtils.random(2, 97, 122, true, true);
        String numbers = RandomStringUtils.randomNumeric(2);
        String specialChar = RandomStringUtils.random(2, 33, 47, false, false);
        String totalChars = RandomStringUtils.randomAlphanumeric(2);
        String combinedChars = upperCaseLetters.concat(lowerCaseLetters)
                .concat(numbers)
                .concat(specialChar)
                .concat(totalChars);
        List<Character> pwdChars = combinedChars.chars()
                .mapToObj(c -> (char) c)
                .collect(Collectors.toList());
        Collections.shuffle(pwdChars);
        String password = pwdChars.stream()
                .collect(StringBuilder::new, StringBuilder::append, StringBuilder::append)
                .toString();
        return password;
    }
}
