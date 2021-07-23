package ru.baikal.ismu.conf.conf.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ru.baikal.ismu.conf.conf.domain.Notification;
import ru.baikal.ismu.conf.conf.domain.Roles;
import ru.baikal.ismu.conf.conf.domain.User;
import ru.baikal.ismu.conf.conf.repos.NotificationRepo;
import ru.baikal.ismu.conf.conf.repos.UserRepo;
import ru.baikal.ismu.conf.conf.repos.UserWithoutTezisRepo;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/spam")
public class SpamRestController {
    @Autowired
    private UserWithoutTezisRepo userWithoutTezisRepo;
    @Autowired
    private NotificationRepo notificationRepo;


    @GetMapping
    @JsonView(UserView.ForUserList.class)
    public List<User> list(@AuthenticationPrincipal User user){

        if(user.getRoles().contains(Roles.ADMIN)){
            List<User> ufs = userWithoutTezisRepo.userWithoutTezis();
            System.out.println("Пользователей без тезисов: "+ufs.size());

            for (int i = 0; i <ufs.size() ; i++) {
                    Notification notification = new Notification();
                if(ufs.get(i).getNotificationAgree()==1) {
                    System.out.println("Создаем спам для пользователя, который дал согласие на оповещения "+ufs.get(i).getUserEmail());
                    notification.setNotificationRecipient(ufs.get(i).getUserEmail());
                    notification.setNotificationSubject("Участие в IV Всероссийской научно-практической конференции с международным участием «Современные проблемы профессионального образования: опыт и пути решения»");
                    notification.setSourceId(ufs.get(i).getId());
                    notification.setUnsubscribeUUID(ufs.get(i).getNotificationUUID());
                    notification.setNotificationBody(
                            "Здравствуйте, " + ufs.get(i).getLastname() + " " + ufs.get(i).getFirstname() + " " + ufs.get(i).getSecname() + "! \n" +
                                    "Вы зарегистрированы в качестве участника конференции, посвященной 100 летию ИГМУ! \n" +
                                    "Мы заметили, что вы прошли регистрацию на конференцию, но до сих пор не оставили ни одной заявки на участие. \n " +
                                    "Если Вы все еще планируете принять участие в конференции - рекомендуем Вам авторизаваться на сайте, используя в качестве имени пользователя - адрес электронной почты, указанный при регистрации и заданный Вами пароль. \n " +
                                    "Затем Вам необходимо перейти в раздел «Мои Заявки» и отправить заявку на участие в конференции, заполнив форму «Добавление заявки на участие в конференции» , заявок может быть несколько. \n\n" +

                                    "Если у Вас не получается войти в систему, Вы можете воспользоваться формой для восстановления пароля, для этого необходимо перейти по ссылке https://conference.ismu.baikal.ru/passwordrequest \n" +
                                    "В ответ Вы получите письмо, содержащее ссылку для запроса нового пароля, после перехода по ссылке новый пароль будет отправлен Вам на электронную почту. \n" +


                                    "\n \n Это письмо было отправлено Вам, так как адрес " + ufs.get(i).getUserEmail() + " был указан при регистрации на https://conference.ismu.baikal.ru" + " " +
                                    "\n \n Для отказа от получения уведомлений перейдите по ССЫЛКЕ: https://conference.ismu.baikal.ru/unsubscribe/" + ufs.get(i).getNotificationUUID());
                    notification.setCreateNotificationDateTime(LocalDateTime.now());
                    notification.setNotificationStatus(0);
                    notificationRepo.save(notification);
                }
            }
            return ufs;
        } else return null;
    }
}
