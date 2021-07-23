package ru.baikal.ismu.conf.conf.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Where;
import ru.baikal.ismu.conf.conf.controller.UserView;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "tezis")
public class Tezis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(UserView.ForNb.class)
    private Long id;
    @JsonView(UserView.ForNb.class)
    private Long authorId;
    @JsonView(UserView.ForNb.class)
    @Column (length = 3000)
    private String tezisName;
    @JsonView(UserView.ForNb.class)
    @Column (length = 3000)
    private String tezisAnnotation;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonView(UserView.ForNb.class)
    private LocalDateTime tezisAddDate;
    @ManyToOne(fetch = FetchType.EAGER )
    @JoinColumn(name = "authorId", insertable = false, updatable = false )
    @JsonView(UserView.ForNb.class)
    private User user;

    @OneToMany(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnoreProperties(value={ "tezis"})
    @JoinColumn(name = "reportId")
    //@Where(clause = "deleted = false")
    @JsonView(UserView.ForNb.class)
    private List<File> files;


    public Tezis(){

    }

    public Tezis(Long id,
                 Long authorId,
                 String tezisName,
                 String tezisAnnotation,
                 LocalDateTime tezisAddDate,
                 List <File> files
    ){
        this.id = id;
        this.authorId =authorId;
        this.tezisName = tezisName;
        this.tezisAnnotation = tezisAnnotation;
        this.tezisAddDate = tezisAddDate;
        this.files = files;

    }

    public List<File> getFiles() {
        return files;
    }

    public void setFiles(List<File> files) {
        this.files = files;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    public String getTezisName() {
        return tezisName;
    }

    public void setTezisName(String tezisName) {
        this.tezisName = tezisName;
    }

    public String getTezisAnnotation() {
        return tezisAnnotation;
    }

    public void setTezisAnnotation(String tezisAnnotation) {
        this.tezisAnnotation = tezisAnnotation;
    }

    public LocalDateTime getTezisAddDate() {
        return tezisAddDate;
    }

    public void setTezisAddDate(LocalDateTime tezisAddDate) {
        this.tezisAddDate = tezisAddDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
