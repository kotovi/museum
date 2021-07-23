package ru.baikal.ismu.conf.conf.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.baikal.ismu.conf.conf.domain.User;

import java.util.List;
import java.util.Optional;

public interface UserRepo  extends JpaRepository<User, Long> {
    User findByUsername(String username);
    Optional<User> findByUserEmail(String userEmail);
    Optional<User> findAllById(Long id);
    Optional<User> findById(Long id);
    Optional<User> findByUserRole(Integer userRole);
    Optional<User> findByNotificationUUID(String notificationUUID);
    Optional<User> findByPasswordUUID(String passwordUUID);

}
