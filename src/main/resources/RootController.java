import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RootController {
    @GetMapping("/")
    public String greeting(){
        return  "/greeting";
    }
    @GetMapping("/login")
    public String login(){
        return "/login";
    }

    @GetMapping("/user")
    public String user() {
        return "/user";
    }

    @GetMapping("/courcemaker")
    public String courcemaker() {

        return "/courcemaker";
    }
    @GetMapping("/group")
    public String group() {

        return "/group";
    }

    @GetMapping("/srvconf")
    public String srvconf() {

        return "/srvconf";
    }
    @GetMapping("/usermaker")
    public String usermaker() {

        return "/usermaker";
    }
}
