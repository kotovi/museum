package ru.baikal.ismu.conf.conf.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="seminar")
public class Seminar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(ViewLevel.MinimalList.class)
    private Long id;
    @JsonView(ViewLevel.MinimalList.class)
    private Long creatorId;
    @JsonView(ViewLevel.MinimalList.class)
    @Column (length = 3000)
    private String seminarName;

    @JsonView(ViewLevel.MinimalList.class)
    @Column (length = 3000)
    private String enSeminarName;

    @JsonView(ViewLevel.MinimalList.class)
    @Column (length = 3000)
    private String seminarDescription;

    @JsonView(ViewLevel.MinimalList.class)
    @Column (length = 3000)
    private String enSeminarDescription;

    @JsonView(ViewLevel.MinimalList.class)
    @Column (length = 1000)
    private String seminarCreateUrl;
    @JsonView(ViewLevel.MinimalList.class)
    @Column (length = 1000)
    private String joinUrl;
    @JsonView(ViewLevel.MinimalList.class)
    private String meetingId;
    @JsonView(ViewLevel.MinimalList.class)
    private Integer meetingStatus;
    @JsonView(ViewLevel.MinimalList.class)
    private Integer recordStatus;
    @JsonView(ViewLevel.MinimalList.class)
    @Column (length = 1000)
    private String meetingRecordUrl;
    @JsonView(ViewLevel.MinimalList.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime seminarBeginDate;

    @JsonView(ViewLevel.MinimalList.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime seminarCreateDate;

    @ManyToOne(fetch = FetchType.EAGER )
    @JoinColumn(name = "creatorId", insertable = false, updatable = false )
    @JsonView(ViewLevel.MinimalList.class)
    private User user;



    public Seminar(){

    }

    public Seminar(Long id,
                    Long creatorId,
                    Long testId,
                    String seminarName,
                    String seminarDescription,
                    String seminarCreateUrl,
                    String meetingId,
                    Integer meetingStatus,
                    String meetingRecordUrl,
                    String joinUrl,
                    LocalDateTime seminarBeginDate,
                    LocalDateTime seminarCreateDate,
                    Integer recordStatus,
                    User user,
                    String enSeminarName,
                    String enSeminarDescription
    ) {
        this.id = id;
        this.joinUrl = joinUrl;
        this.creatorId = creatorId;
        this.seminarName = seminarName;
        this.seminarDescription = seminarDescription;
        this.seminarCreateUrl = seminarCreateUrl;
        this.meetingId = meetingId;
        this.meetingStatus = meetingStatus;
        this.meetingRecordUrl = meetingRecordUrl;
        this.seminarBeginDate = seminarBeginDate;
        this.seminarCreateDate = seminarCreateDate;
        this.recordStatus = recordStatus;
        this.user = user;
        this.enSeminarName =enSeminarName;
        this.enSeminarDescription = enSeminarDescription;

    }


    public String getEnSeminarName() {
        return enSeminarName;
    }

    public void setEnSeminarName(String enSeminarName) {
        this.enSeminarName = enSeminarName;
    }

    public String getEnSeminarDescription() {
        return enSeminarDescription;
    }

    public void setEnSeminarDescription(String enSeminarDescription) {
        this.enSeminarDescription = enSeminarDescription;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getJoinUrl() {
        return joinUrl;
    }

    public void setJoinUrl(String joinUrl) {
        this.joinUrl = joinUrl;
    }

    public Integer getRecordStatus() {
        return recordStatus;
    }

    public void setRecordStatus(Integer recordStatus) {
        this.recordStatus = recordStatus;
    }

    public LocalDateTime getSeminarCreateDate() {
        return seminarCreateDate;
    }

    public void setSeminarCreateDate(LocalDateTime seminarCreateDate) {
        this.seminarCreateDate = seminarCreateDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Long creatorId) {
        this.creatorId = creatorId;
    }

    public String getSeminarName() {
        return seminarName;
    }

    public void setSeminarName(String seminarName) {
        this.seminarName = seminarName;
    }

    public String getSeminarDescription() {
        return seminarDescription;
    }

    public void setSeminarDescription(String seminarDescription) {
        this.seminarDescription = seminarDescription;
    }

    public String getSeminarCreateUrl() {
        return seminarCreateUrl;
    }

    public void setSeminarCreateUrl(String seminarCreateUrl) {
        this.seminarCreateUrl = seminarCreateUrl;
    }

    public String getMeetingId() {
        return meetingId;
    }

    public void setMeetingId(String meetingId) {
        this.meetingId = meetingId;
    }

    public Integer getMeetingStatus() {
        return meetingStatus;
    }

    public void setMeetingStatus(Integer meetingStatus) {
        this.meetingStatus = meetingStatus;
    }

    public String getMeetingRecordUrl() {
        return meetingRecordUrl;
    }

    public void setMeetingRecordUrl(String meetingRecordUrl) {
        this.meetingRecordUrl = meetingRecordUrl;
    }

    public LocalDateTime getSeminarBeginDate() {
        return seminarBeginDate;
    }

    public void setSeminarBeginDate(LocalDateTime seminarBeginDate) {
        this.seminarBeginDate = seminarBeginDate;
    }
}
