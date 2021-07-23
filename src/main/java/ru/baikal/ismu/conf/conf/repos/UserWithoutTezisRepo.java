package ru.baikal.ismu.conf.conf.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.baikal.ismu.conf.conf.domain.User;

import javax.persistence.SqlResultSetMapping;
import java.util.List;

public interface UserWithoutTezisRepo extends JpaRepository<User, Long> {
   @Query("SELECT u FROM User u LEFT JOIN Tezis t  ON u.id = t.authorId WHERE t.authorId IS NULL")
    List<User> userWithoutTezis();
}
