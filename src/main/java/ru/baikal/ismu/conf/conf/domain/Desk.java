package ru.baikal.ismu.conf.conf.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import javax.persistence.Id;

@Entity
@javax.persistence.Table(name="desk")
public class Desk {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String deskName;
    private String deskDescription;
    private Long moderatorId;

    public Desk(){

    }

    public Desk(Long id, String deskName, String deskDescription, Long moderatorId){
        this.id = id;
        this.deskName = deskName;
        this.deskDescription = deskDescription;
        this.moderatorId = moderatorId;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDeskName() {
        return deskName;
    }

    public void setDeskName(String deskName) {
        this.deskName = deskName;
    }

    public String getDeskDescription() {
        return deskDescription;
    }

    public void setDeskDescription(String deskDescription) {
        this.deskDescription = deskDescription;
    }

    public Long getModeratorId() {
        return moderatorId;
    }

    public void setModeratorId(Long moderatorId) {
        this.moderatorId = moderatorId;
    }




}
