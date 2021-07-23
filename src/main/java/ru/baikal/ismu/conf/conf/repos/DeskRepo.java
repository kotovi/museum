package ru.baikal.ismu.conf.conf.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.baikal.ismu.conf.conf.domain.Desk;

import java.util.List;

public interface DeskRepo extends JpaRepository<Desk,Long> {
List<Desk> findAllById(Long id);
List<Desk> findByModeratorIdAndId(Long moderatorId, long id);
List<Desk> findByModeratorId(Long moderatorId);
 }
