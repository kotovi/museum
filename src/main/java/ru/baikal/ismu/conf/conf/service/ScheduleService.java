package ru.baikal.ismu.conf.conf.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import ru.baikal.ismu.conf.conf.domain.Notification;
import ru.baikal.ismu.conf.conf.domain.Seminar;
import ru.baikal.ismu.conf.conf.domain.User;
import ru.baikal.ismu.conf.conf.domain.ViewLevel;
import ru.baikal.ismu.conf.conf.dto.EventType;
import ru.baikal.ismu.conf.conf.dto.ObjectType;
import ru.baikal.ismu.conf.conf.repos.NotificationRepo;
import ru.baikal.ismu.conf.conf.repos.SeminarRepo;
import ru.baikal.ismu.conf.conf.repos.UserRepo;
import ru.baikal.ismu.conf.conf.repos.UserWithoutTezisRepo;
import ru.baikal.ismu.conf.conf.util.WsSender;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.function.BiConsumer;

@Component
public class ScheduleService {
    private  SeminarRepo seminarRepo;
    private  BiConsumer<EventType, Seminar> wsSender;
    private UserRepo userRepo;
    private  MailSender mailSender;
    private NotificationRepo notificationRepo;

    @Autowired
    public ScheduleService(NotificationRepo notificationRepo,
                           MailSender mailSender,
                           UserRepo userRepo,
                           SeminarRepo seminarRepo,
                           WsSender wsSender
    ) {
        this.seminarRepo = seminarRepo;
        this.notificationRepo = notificationRepo;
        this.mailSender = mailSender;
        this.userRepo = userRepo;
        this.wsSender = wsSender.getSender(ObjectType.SEMINAR, ViewLevel.ForFront.class);
    }



    @Scheduled(fixedRate = 20000)
    public void mailNotificator() {
        List<Notification> notification;
        try {
            notification = notificationRepo.findByNotificationStatus(0);
            if (notification.size() > 0) {
                for (Notification value : notification) {
                    mailSender.send(value.getNotificationRecipient(),
                            value.getNotificationSubject(),
                            value.getNotificationBody(), value.getUnsubscribeUUID());
                    value.setNotificationStatus(1);
                    value.setCompliteNotificationDateTime(LocalDateTime.now());
                    notificationRepo.save(value);
                }
            }
        } catch (Exception e) {
            System.out.println("Ошибка при получении списка уведомлений");
            e.printStackTrace();
        }
    }


    @Scheduled(fixedRate = 18000)
    public void checkSeminarRooms() {
        if(true) {

                String serverURL = "";
                String secret = "";

                //Проверяем убита ли комната, если комнаты нет - записываем в БД
                if (seminarRepo.findByMeetingStatusAndMeetingIdIsNotNull(1).isPresent()) {
                    List<Seminar> seminarsForCheck = (seminarRepo.findByMeetingStatusAndMeetingIdIsNotNull(1)).get();
                    for (Seminar seminar : seminarsForCheck) {
                        if (BBBService.GetMeetingInfoUrl(
                                serverURL,
                                secret,
                                seminar.getMeetingId(),
                                "").equals("unsuccess")) {

                            seminar.setMeetingStatus(3);
                            seminarRepo.save(seminar);

                            wsSender.accept(EventType.UPDATE, seminar);

                        } else {
                            System.out.println("Семинар с id: "+ seminar.getMeetingId()+" жив");
                        }
                    }
                }

        }
    }

    @Scheduled(fixedRate = 20000)
    public void CheckSeminarUrl() {
        if(true) {
            String serverURL = "";
            String secret = "";

                //чекаем семинары на наличие записи
                if (seminarRepo.findAllByMeetingStatusAndMeetingRecordUrlIsNull(3).isPresent()) {

                    List<Seminar> seminarForCheckOnRecordList = seminarRepo.findAllByMeetingStatusAndMeetingRecordUrlIsNull(3).get();

                    for (Seminar seminar : seminarForCheckOnRecordList) {
                        String recordUrl = BBBService.getRecordingUrlById(
                                serverURL,
                                secret,
                                seminar.getMeetingId());

                        if (recordUrl.length() > 4) {
                            System.out.println();
                            seminar.setMeetingRecordUrl(recordUrl);

                            wsSender.accept(EventType.UPDATE, seminar);

                            seminarRepo.save(seminar);

                            if (userRepo.findById(seminar.getCreatorId()).isPresent()) {
                                if (userRepo.findById(seminar.getCreatorId()).get().getNotificationAgree() != null) {
                                    Notification notification = new Notification();
                                    String unsubscribeUUID = userRepo.findById(seminar.getUser().getId()).get().getNotificationUUID();
                                    notification.setSourceId(seminar.getId());
                                    notification.setNotificationRecipient(seminar.getUser().getUserEmail());
                                    notification.setNotificationStatus(0);
                                    notification.setCreateNotificationDateTime(LocalDateTime.now());
                                    notification.setUnsubscribeUUID(unsubscribeUUID);
                                    notification.setNotificationSubject("Готова запись семинара: \"" + seminar.getSeminarName() + "\".");
                                    notification.setNotificationBody("Здравствуйте! \n" +
                                            "Просмотр записи семинара \"" + seminar.getSeminarName() + "\" доступен по ссылке: " + seminar.getMeetingRecordUrl() +
                                            "\n \n Это письмо было отправлено Вам, так как адрес " + seminar.getUser().getUserEmail() + " был указан при регистрации на https://portal.ismu.baikal.ru" + " " +
                                            "\n \n Для отказа от получения уведомлений перейдите по ССЫЛКЕ: https://conference.museum-irkutsk.com/unsubscribe/" + unsubscribeUUID);
                                    notificationRepo.save(notification);
                                }
                            }
                        }
                    }
                }
        }
    }



}



