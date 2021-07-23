package ru.baikal.ismu.conf.conf.domain;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@javax.persistence.Table(name = "notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
    private Long sourceId;
    private Integer notificationStatus;
    @Column (length = 5000)
    private String notificationBody;
    private String notificationRecipient;
    @Column (length = 3000)
    private String notificationSubject;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createNotificationDateTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime compliteNotificationDateTime;

    public String getUnsubscribeUUID() {
        return unsubscribeUUID;
    }

    public void setUnsubscribeUUID(String unsubscribeUUID) {
        this.unsubscribeUUID = unsubscribeUUID;
    }

    private String unsubscribeUUID;


    public Notification(){

    }

    public Notification(Long id, String notificationRecepient,
                        String notificationBody, LocalDateTime createNotificationDateTime,
                        LocalDateTime compliteNotificationDateTime , String notificationSubject
            , Long sourceId, Integer notificationStatus, String unsubscribeUUID){
        this.id = id;
        this.sourceId = sourceId;
        this.notificationRecipient = notificationRecepient;
        this.notificationBody = notificationBody;
        this.createNotificationDateTime = createNotificationDateTime;
        this.compliteNotificationDateTime = compliteNotificationDateTime;
        this.notificationSubject = notificationSubject;
        this.notificationStatus = notificationStatus;
        this.unsubscribeUUID = unsubscribeUUID;


    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNotificationBody() {
        return notificationBody;
    }

    public void setNotificationBody(String notificationBody) {
        this.notificationBody = notificationBody;
    }

    public String getNotificationRecipient() {
        return notificationRecipient;
    }

    public void setNotificationRecipient(String notificationRecipient) {
        this.notificationRecipient = notificationRecipient;
    }

    public LocalDateTime getCreateNotificationDateTime() {
        return createNotificationDateTime;
    }

    public void setCreateNotificationDateTime(LocalDateTime createNotificationDateTime) {
        this.createNotificationDateTime = createNotificationDateTime;
    }

    public LocalDateTime getCompliteNotificationDateTime() {
        return compliteNotificationDateTime;
    }

    public void setCompliteNotificationDateTime(LocalDateTime compliteNotificationDateTime) {
        this.compliteNotificationDateTime = compliteNotificationDateTime;
    }
    public String getNotificationSubject() {
        return notificationSubject;
    }

    public void setNotificationSubject(String notificationSubject) {
        this.notificationSubject = notificationSubject;
    }

    public Long getSourceId() {
        return sourceId;
    }

    public void setSourceId(Long sourceId) {
        this.sourceId = sourceId;
    }

    public Integer getNotificationStatus() {
        return notificationStatus;
    }

    public void setNotificationStatus(Integer notificationStatus) {
        this.notificationStatus = notificationStatus;
    }



}
