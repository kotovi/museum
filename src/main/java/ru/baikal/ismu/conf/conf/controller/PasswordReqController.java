package ru.baikal.ismu.conf.conf.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.baikal.ismu.conf.conf.domain.Notification;
import ru.baikal.ismu.conf.conf.domain.User;
import ru.baikal.ismu.conf.conf.repos.NotificationRepo;
import ru.baikal.ismu.conf.conf.repos.UserRepo;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Controller
@JsonView(UserView.ForNotification.class)
@RequestMapping("/reqpassword")
public class PasswordReqController {
    @Autowired
    UserRepo userRepo;
    @Autowired
    private NotificationRepo notificationRepo;
    String redirectUrl;

    @GetMapping("{email}")
    public String Resetpassword(@PathVariable("email") String email, Notification notification) {
        Optional<User> user = userRepo.findByUserEmail(email);

        if (user.isPresent()) {
            user.get().setPasswordUUID(UUID.randomUUID().toString());
            user.get().setPasswordRequestDate(LocalDateTime.now());

            notification.setNotificationRecipient(user.get().getUserEmail());
            notification.setNotificationSubject("Запрос сброса пароля для регистрации на конференцию");
            notification.setNotificationBody(
                    "Здравствуйте," + user.get().getLastname() + " " + user.get().getFirstname() + " " + user.get().getSecname() + "! \n" +
                            "Вы зарегистрированы в качестве участника конференции,«Актуальные тенденции современной стоматологии»! \n" +
                            "Вами был сделан запрос на сброс пароля для доступа к системе! \n" +
                            "\n \n Для сброса пароля перейдите по ССЫЛКЕ: https://stom.ismu.baikal.ru/resetpassword/" + user.get().getPasswordUUID() + "  \n" +
                            "\n \n Если Вы не запрашивали сброс пароля - просто проигнорируйте это письмо.\n" +
                            "\n \n Это письмо было отправлено Вам, так как адрес " + user.get().getUserEmail() + " был указан при регистрации на https://stom.ismu.baikal.ru" + " " +
                            "\n \n Для отказа от получения уведомлений перейдите по ССЫЛКЕ: https://stom.ismu.baikal.ru/unsubscribe/" + user.get().getNotificationUUID());
            notification.setCreateNotificationDateTime(LocalDateTime.now());

            notification.setNotificationStatus(0);
            notification.setUnsubscribeUUID(user.get().getNotificationUUID());
            notification.setSourceId(user.get().getId());
            notificationRepo.save(notification);
            userRepo.save(user.get());

            redirectUrl = "redirect:/success_req_password";
            return redirectUrl;
        } else {
            redirectUrl = "redirect:/unsuccess_req_password";
            return redirectUrl;
        }
    }
}
