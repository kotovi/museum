package ru.baikal.ismu.conf.conf.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.baikal.ismu.conf.conf.domain.File;

import java.util.List;
import java.util.Optional;

public interface FileRepo extends JpaRepository<File,Long> {
    Optional<List<File>> findAllByReportId(Long ReportId);

    void deleteFileById(Long id);
}
