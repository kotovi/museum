package ru.baikal.ismu.conf.conf.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import ru.baikal.ismu.conf.conf.controller.UserView;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="file")
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(UserView.ForNb.class)
    private Long id;
    @JsonView(UserView.ForNb.class)
    private Long reportId;
    @JsonView(UserView.ForNb.class)
    private String fileName;
    @JsonView(UserView.ForNb.class)
    private String fileDescription;
    @JsonView(UserView.ForNb.class)
    private String randomFileName;
    @JsonView(UserView.ForNb.class)
    private Long creatorId;
    @JsonView(UserView.ForNb.class)
    private Integer fileType;
    @JsonView(UserView.ForNb.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createDateTime;
    @ManyToOne(fetch = FetchType.EAGER )
    @JoinColumn(name = "reportId", insertable = false, updatable = false )
    @JsonView(UserView.ForNb.class)
    private Tezis tezis;

    public File(){
    }

    public File(Long id,
                Long reportId,
                String fileName,
                String fileDescription,
                String randomFileName,
                Long creatorId,
                Integer fileType,
                LocalDateTime createDateTime,
                Tezis tezis) {
        this.id = id;
        this.reportId = reportId;
        this.fileName = fileName;
        this.fileDescription = fileDescription;
        this.randomFileName = randomFileName;
        this.creatorId = creatorId;
        this.fileType = fileType;
        this.createDateTime = createDateTime;
        this.tezis = tezis;
    }

    public Tezis getTezis() {
        return tezis;
    }

    public void setTezis(Tezis tezis) {
        this.tezis = tezis;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getReportId() {
        return reportId;
    }

    public void setReportId(Long reportId) {
        this.reportId = reportId;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileDescription() {
        return fileDescription;
    }

    public void setFileDescription(String fileDescription) {
        this.fileDescription = fileDescription;
    }

    public String getRandomFileName() {
        return randomFileName;
    }

    public void setRandomFileName(String randomFileName) {
        this.randomFileName = randomFileName;
    }

    public Long getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Long creatorId) {
        this.creatorId = creatorId;
    }

    public Integer getFileType() {
        return fileType;
    }

    public void setFileType(Integer fileType) {
        this.fileType = fileType;
    }

    public LocalDateTime getCreateDateTime() {
        return createDateTime;
    }

    public void setCreateDateTime(LocalDateTime createDateTime) {
        this.createDateTime = createDateTime;
    }
}
