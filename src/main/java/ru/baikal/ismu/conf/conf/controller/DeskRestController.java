package ru.baikal.ismu.conf.conf.controller;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ru.baikal.ismu.conf.conf.domain.Desk;
import ru.baikal.ismu.conf.conf.domain.Roles;
import ru.baikal.ismu.conf.conf.domain.User;
import ru.baikal.ismu.conf.conf.repos.DeskRepo;
import java.util.List;

@RestController
@RequestMapping("/desks")
public class DeskRestController {
    @Autowired
    private DeskRepo deskRepo;


    @GetMapping()
        public List<Desk> list (@AuthenticationPrincipal User user) {
            if (user.getRoles().contains(Roles.USER)) {
                return deskRepo.findAll();
            } else return null;
    }

    @GetMapping("{id}")

    public List<Desk> list(@PathVariable("id") String id,
                           @AuthenticationPrincipal User user){
        if (user.getRoles().contains(Roles.USER)) {
            return deskRepo.findAllById(Long.valueOf(id));
        } else return null;
    }
    @PostMapping
    public Desk create(
            @RequestBody Desk desk,
            @AuthenticationPrincipal User user){
        if(user.getRoles().contains(Roles.ADMIN)) {
            return deskRepo.save(desk);
        }else return null;
    }
    @PutMapping("{id}")
    public Desk update(
            @PathVariable("id") Desk deskFromDb,
            @RequestBody Desk desk,
            @AuthenticationPrincipal User user) {
        if(user.getRoles().contains(Roles.ADMIN)) {
            BeanUtils.copyProperties(desk, deskFromDb, "id");
            return deskRepo.save(deskFromDb);
        } else return null;
    }
    @DeleteMapping("{id}")
    public void delete( @PathVariable("id") Desk desk,
                        @AuthenticationPrincipal User user){
        if(user.getRoles().contains(Roles.ADMIN)) {
            deskRepo.delete(desk);
        }
    }

}
