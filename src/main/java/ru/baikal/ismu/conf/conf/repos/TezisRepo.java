package ru.baikal.ismu.conf.conf.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.baikal.ismu.conf.conf.domain.Tezis;

import java.util.List;
import java.util.Optional;

public interface TezisRepo extends JpaRepository<Tezis, Long> {

    Optional<Tezis> findById(Long aLong);
}
