package ru.baikal.ismu.conf.conf.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import ru.baikal.ismu.conf.conf.domain.Roles;
import ru.baikal.ismu.conf.conf.domain.Seminar;
import ru.baikal.ismu.conf.conf.domain.User;
import ru.baikal.ismu.conf.conf.domain.ViewLevel;
import ru.baikal.ismu.conf.conf.dto.EventType;
import ru.baikal.ismu.conf.conf.dto.ObjectType;
import ru.baikal.ismu.conf.conf.repos.SeminarRepo;
import ru.baikal.ismu.conf.conf.service.BBBService;
import ru.baikal.ismu.conf.conf.util.WsSender;

import java.util.Optional;
import java.util.function.BiConsumer;


@Controller


public class BeginSeminarController {

    private final SeminarRepo seminarRepo;
    private final BiConsumer<EventType, Seminar> wsSender;

    @Autowired
    public BeginSeminarController(SeminarRepo seminarRepo,
                                  WsSender wsSender
                                  ){
        this.seminarRepo = seminarRepo;

        this.wsSender  = wsSender.getSender(ObjectType.SEMINAR, ViewLevel.ForFront.class);


    }
    public static String transliterate(String message){
        char[] abcCyr =   {' ','а','б','в','г','д','е','ё', 'ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х', 'ц','ч', 'ш','щ','ъ','ы','ь','э', 'ю','я','А','Б','В','Г','Д','Е','Ё', 'Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х', 'Ц', 'Ч','Ш', 'Щ','Ъ','Ы','Ь','Э','Ю','Я','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'};
        String[] abcLat = {" ","a","b","v","g","d","e","e","zh","z","i","y","k","l","m","n","o","p","r","s","t","u","f","h","ts","ch","sh","sch", "","i", "","e","ju","ja","A","B","V","G","D","E","E","Zh","Z","I","Y","K","L","M","N","O","P","R","S","T","U","F","H","Ts","Ch","Sh","Sch", "","I", "","E","Ju","Ja","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"};
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < message.length(); i++) {
            for (int x = 0; x < abcCyr.length; x++ ) {
                if (message.charAt(i) == abcCyr[x]) {
                    builder.append(abcLat[x]);
                }
            }
        }
        return builder.toString();
    }

    @GetMapping("/seminar/begin/{id}")
    public String redirect (@PathVariable("id") String id,
                            @AuthenticationPrincipal User user) {


        Optional<Seminar> seminar = seminarRepo.findById(Long.valueOf(id));
        String joinUrl = null;
            if(
                    user.getRoles().contains(Roles.ADMIN) ||
                    user.getRoles().contains(Roles.MODERATOR) ||
                    user.getRoles().contains(Roles.USER)

            ){

                if(seminar.isPresent()) {
                    Seminar newSeminar = seminar.get();
                    String atendeePassword = "";
                    String moderatorPassword = "";
                    String fullUserName = user.getFirstname() +"_"+user.getLastname();
                    String fullUserNameTranslit = transliterate(fullUserName);
                    String passwordForJoin;
                    String  serverURL= "";
                    String secret = "";

                    if(
                       (newSeminar.getCreatorId().equals(user.getId())) &
                       (user.getRoles().contains(Roles.ADMIN) ||
                       user.getRoles().contains(Roles.MODERATOR))
                    ){
                        passwordForJoin = atendeePassword;
                    } else {
                        System.out.println("I'm seminar listener");
                        System.out.println("Roles:" + user.getRoles());
                        passwordForJoin = moderatorPassword;
                    }

                    try {
                        //если у лекции существует id встречи
                        if (newSeminar.getMeetingId()!= null) {
                            //если комната активна - отдаем url для входа
                            if (BBBService.GetMeetingInfoUrl(
                                    serverURL,
                                    secret,
                                    newSeminar.getMeetingId(),
                                    moderatorPassword
                            ).equals("success") &
                                    (newSeminar.getMeetingStatus() == 1) &
                                    (newSeminar.getRecordStatus() == 1)) {


                                joinUrl = BBBService.joinSeminarUrl(
                                        serverURL,
                                        secret,
                                        newSeminar.getMeetingId(),
                                        fullUserNameTranslit,
                                        passwordForJoin);


                                joinUrl = "redirect:" + joinUrl;
                                return joinUrl;
                            }
                            //если комната уже закрылась - редиректим на страницу с лекциями
                            if (BBBService.GetMeetingInfoUrl(
                                    serverURL,
                                    secret,
                                    newSeminar.getMeetingId(),
                                    passwordForJoin
                            ).equals("unsuccess")) {

                                newSeminar.setMeetingStatus(3);

                                seminarRepo.saveAndFlush(newSeminar);
                                joinUrl = "redirect:/";
                                return joinUrl;

                            }

                        } else {
                            //создаем новую комнату
                            //вот тут оно иногда обебывается если вебинарный сервер по какой то причине долго не отвечает, нужно будет покрутить
                            //if ((seminar.get().getMeetingStatus() == 0)&(seminar.get().getCreatorId()==user.getId())) {
                            if (seminar.get().getMeetingStatus() == 0) {
                                if (
                                    (user.getRoles().contains(Roles.MODERATOR)) ||
                                    (user.getRoles().contains(Roles.ADMIN))
                                ) {
                                    Seminar seminarW = BBBService.createSeminarUrl(
                                            serverURL,
                                            secret,
                                            seminar.get().getSeminarName(),
                                            atendeePassword,
                                            moderatorPassword,
                                            seminar.get(),
                                            "");
                                    joinUrl = "";

                                    if (seminarW.getMeetingStatus() == 1) {
                                        joinUrl = BBBService.joinSeminarUrl(
                                                serverURL,
                                                secret,
                                                newSeminar.getMeetingId(),
                                                fullUserNameTranslit,
                                                passwordForJoin);
                                    }

                                    joinUrl = "redirect:" + joinUrl;


                                    wsSender.accept(EventType.UPDATE, seminarW);

                                } else {

                                        joinUrl = "redirect:https://conference.museum-irkutsk.com/seminars";

                                return joinUrl;
                            }
                        }
                    }

                    }catch (Exception e){
                        e.printStackTrace();
                    }
                }
            }
        return joinUrl;
    }
}
