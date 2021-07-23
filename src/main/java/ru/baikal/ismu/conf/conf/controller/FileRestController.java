package ru.baikal.ismu.conf.conf.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ru.baikal.ismu.conf.conf.domain.File;
import ru.baikal.ismu.conf.conf.domain.Roles;
import ru.baikal.ismu.conf.conf.domain.User;
import ru.baikal.ismu.conf.conf.repos.FileRepo;
import ru.baikal.ismu.conf.conf.repos.UserRepo;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@RestController
public class FileRestController {
    private final FileRepo fileRepo;
    private final UserRepo userRepo;

    @Autowired
    public FileRestController(FileRepo fileRepo,
                              UserRepo userRepo){
        this.fileRepo=fileRepo;
        this.userRepo = userRepo;
    }

    @GetMapping("/file")
    @JsonView(UserView.ForNb.class)
    public List<File> files(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication.getAuthorities().contains(Roles.ADMIN)){
            return  fileRepo.findAll();
        } else {
            return null;
        }
    }
    //возможно не хватает прав
    @GetMapping("/file/{id}")
    @JsonView(UserView.ForNb.class)
    public List<File> filesForLection(
            @PathVariable("id") String id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication.getAuthorities().contains(Roles.USER)){
            if(fileRepo.findAllByReportId(Long.valueOf(id)).isPresent()){
                return  fileRepo.findAllByReportId(Long.valueOf(id)).get();
            } else return null;
        } else return null;
    }

    @PostMapping("/file")
    @JsonView(UserView.ForNb.class)
    public File create(
            @AuthenticationPrincipal User user,
            @RequestBody File file) {
        if(user.getRoles().contains(Roles.ADMIN)){
                file.setCreateDateTime(LocalDateTime.now());
                file.setCreatorId(user.getId());
                return fileRepo.saveAndFlush(file);
        } else  return null;
    }

    @PutMapping("/file{/id}")
    @JsonView(UserView.ForNb.class)
    public File update(
            @AuthenticationPrincipal User user,
            @PathVariable("id") File fileFromDb,
            @RequestBody File file){

        if (
            (file.getCreatorId().equals(user.getId())) ||
            (user.getRoles().contains(Roles.ADMIN))
        ){
            BeanUtils.copyProperties(file,
                    fileFromDb,
                    "id",
                    "creatorId",
                    "createDateTime",
                    "randomFileName",
                    "reportId");
            return fileRepo.saveAndFlush(fileFromDb);
        }else return null;
    }

    @DeleteMapping("/file/{id}")
    @JsonView(UserView.ForNb.class)

    @Transactional
    public void delete(@PathVariable("id") File file,
                       @AuthenticationPrincipal User user) {
        if(
           (file.getCreatorId().equals(user.getId())) ||
           (user.getRoles().contains(Roles.ADMIN))
        ){
            Long id = file.getId();
            fileRepo.deleteFileById(id);
        }
    }
}
