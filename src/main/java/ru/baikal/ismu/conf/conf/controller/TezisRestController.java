package ru.baikal.ismu.conf.conf.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ru.baikal.ismu.conf.conf.domain.Roles;
import ru.baikal.ismu.conf.conf.domain.Tezis;
import ru.baikal.ismu.conf.conf.domain.User;
import ru.baikal.ismu.conf.conf.repos.TezisRepo;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/tezises")
@JsonView(UserView.ForUserList.class)
public class TezisRestController {
    @Autowired
    private TezisRepo tezisRepo;


    @GetMapping()
    @JsonView(UserView.ForNb.class)
    public List<Tezis> list(@AuthenticationPrincipal User user){
        if (
            user.getRoles().contains(Roles.ADMIN) ||
            user.getRoles().contains(Roles.USER)
        ){
            return tezisRepo.findAll();
        } else  return null;
    }
    @GetMapping("/{id}")
    @JsonView(UserView.ForNb.class)
    public Tezis list(@PathVariable("id") Long id,
                      @AuthenticationPrincipal User user){
        if (user.getRoles().contains(Roles.ADMIN)){
            if(tezisRepo.findById(id).isPresent()){
                return tezisRepo.findById(id).get();
            } else return null;
        } else  return null;
    }

    @PostMapping
    @JsonView(UserView.ForNb.class)
    public Tezis create(@RequestBody Tezis tezis,
                        @AuthenticationPrincipal User user){
        if (user.getRoles().contains(Roles.ADMIN)){
            tezis.setTezisAddDate(LocalDateTime.now());

            tezis.setAuthorId(user.getId());
            return tezisRepo.save(tezis);
        } else return null;
    }
    @PutMapping("{id}")
    @JsonView(UserView.ForNb.class)
    public Tezis update(@PathVariable("id") Tezis tezisFromDb,
                        @RequestBody Tezis tezis,
                        @AuthenticationPrincipal User user){
        if(user.getRoles().contains(Roles.ADMIN)){
            BeanUtils.copyProperties(tezis,
                    tezisFromDb,
                    "id",
                    "authorId",
                    "tezisAddDate");
            tezisFromDb.setAuthorId(user.getId());
            return tezisRepo.save(tezisFromDb);
        }
        else return null;
    }
    @DeleteMapping("{id}")
    @JsonView(UserView.ForNb.class)
    public void  delete(@PathVariable("id") Tezis tezis,
                        @AuthenticationPrincipal User user){
        if(user.getRoles().contains(Roles.ADMIN)){
            tezisRepo.delete(tezis);
        }
    }
}
