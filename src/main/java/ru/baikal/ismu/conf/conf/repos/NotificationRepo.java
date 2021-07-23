package ru.baikal.ismu.conf.conf.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.baikal.ismu.conf.conf.domain.Notification;

import java.util.List;

public interface NotificationRepo extends JpaRepository<Notification, Long> {
    List<Notification> findByNotificationStatus(Integer notificationStatus);

}
