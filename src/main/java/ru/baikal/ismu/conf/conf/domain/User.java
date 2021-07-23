package ru.baikal.ismu.conf.conf.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import ru.baikal.ismu.conf.conf.controller.UserView;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Set;


@Entity
@javax.persistence.Table(name ="usr")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(UserView.ForNb.class)
    private Long id;
    @JsonView(UserView.ForNb.class)
    private String username;
    @JsonView({UserView.ForNb.class,ViewLevel.ForFront.class, ViewLevel.MinimalList.class})
    private String firstname;
    @JsonView({UserView.ForNb.class,ViewLevel.ForFront.class, ViewLevel.MinimalList.class})
    private String lastname;
    @JsonView({UserView.ForNb.class,ViewLevel.ForFront.class, ViewLevel.MinimalList.class})
    private String secname;
    @JsonView(UserView.ForNb.class)
    private Integer userRole;
    @JsonView(UserView.ForUserList.class)
    @Column (length = 1000)
    private String organization;
    @JsonView(UserView.ForUserList.class)
    @Column (length = 1000)
    private String degree;
    @JsonView(UserView.ForUserList.class)
    @Column (length = 1000)
    private String organizationPostAddress;
    @JsonView(UserView.ForUserList.class)
    private String phoneNumber;
    @JsonView(UserView.ForUserList.class)
    private String userEmail;
    @JsonView(UserView.FullUserList.class)
    private String password;
    @JsonView(UserView.ForUserList.class)
    private Boolean active;
    @JsonView(UserView.FullUserList.class)
    private Boolean isDeleted;
    @JsonView(UserView.FullUserList.class)
    private Long whoDeleted;
    @JsonView(UserView.FullUserList.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime deleteDate;
    @JsonView(UserView.ForNb.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime registrationDate;
    @JsonView(UserView.ForNotification.class)
    private Integer notificationAgree;
    @JsonView(UserView.ForNotification.class)
    private String notificationUUID;



    @JsonView(UserView.ForNotification.class)
    private String passwordUUID;
    @JsonView(UserView.ForNotification.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime passwordRequestDate;

    @ElementCollection(targetClass = Roles.class, fetch = FetchType.EAGER)
    @CollectionTable(name ="user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)

    private Set<Roles> roles;

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    public LocalDateTime getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(LocalDateTime registrationDate) {
        this.registrationDate = registrationDate;
    }

    @Override
    public boolean isEnabled() {
        return isActive();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return getRoles();
    }


    public User(){

    }

    public Integer getUserRole() {
        return userRole;
    }

    public void setUserRole(Integer userRole) {
        this.userRole = userRole;
    }

    public Boolean getActive() {
        return active;
    }

    public Integer getNotificationAgree() {
        return notificationAgree;
    }

    public void setNotificationAgree(Integer notificationAgree) {
        this.notificationAgree = notificationAgree;
    }

    public String getNotificationUUID() {
        return notificationUUID;
    }

    public void setNotificationUUID(String notificationUUID) {
        this.notificationUUID = notificationUUID;
    }

    public User(Long id, Integer userRole, String username, String firstname, String lastname, String secname, String password, Boolean active,
                String userEmail, Boolean isDeleted, Long whoDeleted, LocalDateTime deleteDate, String organization,
                String degree, String organizationPostAddress, String phoneNumber, Integer notificationAgree , String notificationUUID, LocalDateTime registrationDate, String passwordUUID, LocalDateTime passwordRequestDate    ){
        this.id=id;
        this.userRole=userRole;
        this.username=username;
        this.password=password;
        this.active=active;
        this.firstname = firstname;
        this.lastname = lastname;
        this.userEmail = userEmail;
        this.secname = secname;

        this.degree=degree;
        this.organization = organization;
        this.organizationPostAddress=organizationPostAddress;
        this.phoneNumber = phoneNumber;

        this.deleteDate = deleteDate;
        this.whoDeleted = whoDeleted;
        this.isDeleted = isDeleted;
        this.notificationAgree = notificationAgree;
        this.notificationUUID = notificationUUID;

        this.registrationDate = registrationDate;

        this.passwordRequestDate = passwordRequestDate;
        this.passwordUUID = passwordUUID;



    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getSecname() {
        return secname;
    }

    public void setSecname(String secname) {
        this.secname = secname;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getOrganizationPostAddress() {
        return organizationPostAddress;
    }

    public void setOrganizationPostAddress(String organizationPostAddress) {
        this.organizationPostAddress = organizationPostAddress;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    public Long getWhoDeleted() {
        return whoDeleted;
    }

    public void setWhoDeleted(Long whoDeleted) {
        this.whoDeleted = whoDeleted;
    }

    public LocalDateTime getDeleteDate() {
        return deleteDate;
    }

    public void setDeleteDate(LocalDateTime deleteDate) {
        this.deleteDate = deleteDate;
    }

    public Set<Roles> getRoles() {
        return roles;
    }

    public void setRoles(Set<Roles> roles) {
        this.roles = roles;
    }
    public String getPasswordUUID() {
        return passwordUUID;
    }

    public void setPasswordUUID(String passwordUUID) {
        this.passwordUUID = passwordUUID;
    }

    public LocalDateTime getPasswordRequestDate() {
        return passwordRequestDate;
    }

    public void setPasswordRequestDate(LocalDateTime passwordRequestDate) {
        this.passwordRequestDate = passwordRequestDate;
    }




}
