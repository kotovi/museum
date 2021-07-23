package ru.baikal.ismu.conf.conf.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.baikal.ismu.conf.conf.domain.Notification;
import ru.baikal.ismu.conf.conf.domain.Roles;
import ru.baikal.ismu.conf.conf.domain.User;
import ru.baikal.ismu.conf.conf.repos.UserRepo;
import ru.baikal.ismu.conf.conf.repos.NotificationRepo;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static ru.baikal.ismu.conf.conf.domain.Roles.ADMIN;
import static ru.baikal.ismu.conf.conf.domain.Roles.USER;

@RestController
@RequestMapping("/userlist")

public class UserRestController {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private NotificationRepo notificationRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;



    @GetMapping
    @JsonView(UserView.ForUserList.class)
    public List<User> list(@AuthenticationPrincipal User user){
        if (user.getRoles().contains(Roles.ADMIN)){
            return userRepo.findAll();
        } else  return null;
    }


    @GetMapping("{id}")
    public User getOne(@PathVariable("id") User user){
        return user;
    }


    @JsonView(UserView.ForUserList.class)
    @PostMapping
    public User create(@RequestBody  User user,
                       Notification notification){

        if (!userRepo.findByUserEmail(user.getUserEmail()).isPresent()) {
            user.setUsername(user.getUserEmail());
            user.setNotificationUUID(UUID.randomUUID().toString());
            user.setNotificationAgree(1);
            notification.setNotificationRecipient(user.getUserEmail());
            notification.setNotificationSubject("Регистрация на конференцию");
            notification.setSourceId(user.getId());
            notification.setUnsubscribeUUID(user.getNotificationUUID());
            notification.setNotificationBody(
                    "Здравствуйте," + user.getLastname() + " " + user.getFirstname() + " " + user.getSecname() + "! \n" +
                            "Вы зарегистрированы в качестве участника конференции! \n" +
                            "Для просмотра докладов Вам необходимо перейти в раздел \"Семинары\", авторизовавшись со следующими учетными данными:" +
                            "\n Логин: " + user.getUsername() + " " +
                            "\n Пароль: " + user.getPassword() + " " +
                            "\n \n Это письмо было отправлено Вам, так как адрес " + user.getUserEmail() + " был указан при регистрации на  https://conference.museum-irkutsk.com" + " " +
                            "\n \n Для отказа от получения уведомлений перейдите по ССЫЛКЕ: https://conference.museum-irkutsk.com/unsubscribe/" + user.getNotificationUUID());
            notification.setCreateNotificationDateTime(LocalDateTime.now());
            user.setRegistrationDate(LocalDateTime.now());
            notification.setNotificationStatus(0);

            user.setActive(true);
            user.setUserRole(1);
            System.out.println("notificationBody: " + notification.getNotificationBody());

            notificationRepo.save(notification);

            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRoles(Collections.singleton(USER));

            return userRepo.save(user);
        }
        else return null;

    }

    @PutMapping("{id}")
    public User update(@PathVariable("id") User userFromDb,
                       @RequestBody User user,
                       Notification notification){


        if(user.getPassword()==null) {
           // if (user.getUserGroup()==0) user.setUserGroup(null);
            BeanUtils.copyProperties( user, userFromDb,  "id", "password", "userRole", "roles","isDeleted");
        } else{
            //if (user.getUserGroup()==0) user.setUserGroup(null);
            BeanUtils.copyProperties( user, userFromDb, "id", "userRole", "roles", "isDeleted");

            notification.setNotificationRecipient(userFromDb.getUserEmail());
            notification.setNotificationSubject("Изменение пароля ");
            notification.setNotificationBody("Здравствуйте," +userFromDb.getFirstname()+" "+userFromDb.getLastname()+"! \n" +
                    "Ваш новый пароль:"+userFromDb.getPassword() );
            notification.setCreateNotificationDateTime(LocalDateTime.now());
            notification.setNotificationStatus(0);
            notification.setSourceId(userFromDb.getId());
            notificationRepo.save(notification);

            userFromDb.setPassword(passwordEncoder.encode(userFromDb.getPassword()));
        }
        return userRepo.save(userFromDb);
    }

    @DeleteMapping("{id}")
    public User delete(@PathVariable("id") User userForDelet,
                       @RequestBody User user ) {

        if (user.getRoles().contains(ADMIN)) {
            userForDelet.setDeleted(true);
            userForDelet.setDeleteDate(LocalDateTime.now());
            userForDelet.setWhoDeleted(user.getId());
            return userRepo.save(userForDelet);
        } else return null;

    }
}
