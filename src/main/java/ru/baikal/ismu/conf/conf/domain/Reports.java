package ru.baikal.ismu.conf.conf.domain;

import javax.persistence.*;

@Entity
@javax.persistence.Table(name="reports")
public class Reports {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private String reportTheme;
    private String reportAnnotation;
    private Integer reportStatus;

    public Reports(){}


    public Reports(Long Id, Long userId, String reportTheme, String reportAnnotation, Integer reportStatus ){
        this.id = id;
        this.userId = userId;
        this.reportTheme = reportTheme;
        this.reportAnnotation = reportAnnotation;
        this.reportStatus = reportStatus;

    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getReportTheme() {
        return reportTheme;
    }

    public void setReportTheme(String reportTheme) {
        this.reportTheme = reportTheme;
    }

    public String getReportAnnotation() {
        return reportAnnotation;
    }

    public void setReportAnnotation(String reportAnnotation) {
        this.reportAnnotation = reportAnnotation;
    }

    public Integer getReportStatus() {
        return reportStatus;
    }

    public void setReportStatus(Integer reportStatus) {
        this.reportStatus = reportStatus;
    }



}



