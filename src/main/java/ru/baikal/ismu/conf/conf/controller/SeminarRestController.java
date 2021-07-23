package ru.baikal.ismu.conf.conf.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ru.baikal.ismu.conf.conf.domain.Roles;
import ru.baikal.ismu.conf.conf.domain.Seminar;
import ru.baikal.ismu.conf.conf.domain.User;
import ru.baikal.ismu.conf.conf.domain.ViewLevel;
import ru.baikal.ismu.conf.conf.dto.EventType;
import ru.baikal.ismu.conf.conf.dto.ObjectType;
import ru.baikal.ismu.conf.conf.repos.SeminarRepo;
import ru.baikal.ismu.conf.conf.util.WsSender;

import java.time.LocalDateTime;
import java.util.List;
import java.util.function.BiConsumer;


@RestController
//@Api(description = "контроллер  для  управления семинарами")
public class SeminarRestController {
    private final SeminarRepo seminarRepo;
    private final BiConsumer<EventType, Seminar> wsSender;
    @Autowired
    public SeminarRestController(
            SeminarRepo seminarRepo,
            WsSender wsSender

    ) {
        this.seminarRepo = seminarRepo;
        this.wsSender  = wsSender.getSender(ObjectType.SEMINAR, ViewLevel.ForFront.class);

    }

    @GetMapping("/seminar")
    @JsonView(ViewLevel.MinimalList.class)
    public List<Seminar> seminarList(@AuthenticationPrincipal User user){

        if(user.getRoles().contains(Roles.USER)){
            return  seminarRepo.findAll();
        }
        else return null;
    }

    @GetMapping("/seminar/{id}")
    @JsonView(ViewLevel.MinimalList.class)
    public Seminar seminar(@AuthenticationPrincipal User user,
                           @PathVariable("id") String id){
    if(user.getRoles().contains(Roles.USER)){
        if (seminarRepo.findById(Long.valueOf(id)).isPresent()){
            return seminarRepo.findById(Long.valueOf(id)).get();
        }
        else return null;
    }
        else return  null;
    }


    @PostMapping("/seminar")
    @JsonView(ViewLevel.MinimalList.class)
    public Seminar createSeminar(
            @AuthenticationPrincipal User user,
            @RequestBody Seminar seminar){
        if (
                user.getRoles().contains(Roles.ADMIN) ||
                user.getRoles().contains(Roles.MODERATOR)
        ){
            seminar.setCreatorId(user.getId());
            seminar.setSeminarCreateDate(LocalDateTime.now());
            seminar.setMeetingStatus(0);
            seminar.setUser(user);
            seminarRepo.saveAndFlush(seminar);
            seminar.setId(seminar.getId());
            wsSender.accept(EventType.CREATE, seminar);
            return  seminar;
        }
        else return null;
    }

    //тут какая то ебань?
    @PutMapping("/seminar/{id}")
    @JsonView(ViewLevel.MinimalList.class)
    public Seminar updateSeminar(
            @AuthenticationPrincipal User user,
            @RequestBody Seminar seminar,
            @PathVariable("id") Seminar seminarFromDb){


        if (
            (user.getRoles().contains(Roles.ADMIN))&
            (seminarFromDb.getCreatorId().equals(user.getId()))
        ){
            BeanUtils.copyProperties(seminar,seminarFromDb,
                    "id",
                    "meetingStatus",
                    "meetingRecordUrl",
                    "seminarCreateDate",
                    "creatorId",
                    "user"
            );
            wsSender.accept(EventType.UPDATE, seminar);
            return  seminarRepo.saveAndFlush(seminarFromDb);
        }
        else return null;
    }

    @DeleteMapping("/seminar/{id}")
    @JsonView(ViewLevel.MinimalList.class)

    public void delete(@PathVariable("id") Seminar seminar,
                       @AuthenticationPrincipal User user) {

        if (
             (user.getId().equals(seminar.getCreatorId())) ||
             (user.getRoles().contains(Roles.ADMIN))
        ) {
            wsSender.accept(EventType.REMOVE, seminar);
            seminarRepo.delete(seminar);
        }
    }


}
