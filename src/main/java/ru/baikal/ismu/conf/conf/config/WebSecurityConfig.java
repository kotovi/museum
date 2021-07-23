package ru.baikal.ismu.conf.conf.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import ru.baikal.ismu.conf.conf.service.UserService;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder(8);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/",
                        "/login",
                        "/js/navbar.js",
                        "/js/pharm.js",
                        "/js/registration.js",
                        "/js/politic.js",
                        "/js/useragreement.js",
                        "/js/public/sockjs.min.js",
                        "/js/public/stomp.js",
                        "/js/public/lodash.js",
                        "/js/passwordrequest.js",
                        "/passwordrequest",
                        "/js/bootstrap.min.js",
                        "/css/**","/registration",
                        "/userlist",
                        "/checkUser",
                        "/checkUser/**",
                        "/nav",
                        "/js/greeting.js",
                        "/js/scripts.js",
                        "/success_unsubscrube",
                        "/unsuccess_unsubscrube",
                        "/unsuccess_reset_password",
                        "/success_reset_password",
                        "/unsuccess_req_password",
                        "/success_req_password",
                        "/unsubscribe",
                        "/unsubscribe/**",
                        "/resetpassword",
                        "/resetpassword/**",
                        "/reqpassword",
                        "/reqpassword/**",
                        "/politic",
                        "/pharm",
                        "/files/**",
                        "/js/file.js",
                        "/js/public/**",
                        "/js/public/",
                        "/css/",
                        "/css/**",
                        "/useragreement",
                        "/video/",
                        "/img/",
                        "/img/**",
                        "/video/**").permitAll()
                .antMatchers("/gs-guide-websocket","/seminars", "/seminar", "/seminar/**", "/js/seminars.js", "/js/tezis.js","/tezis", "/upload","/video","registred", "/js/registrd.js", "/js/report.js","/js/file.js","/files","/file","/report").hasAnyAuthority("USER","MODERATOR", "ADMIN")
                .antMatchers("/js/tickets.js", "/js/rejectedTickets.js", "/rejectedticket","/tickets", "/agreetickets").hasAnyAuthority("MODERATOR", "ADMIN")
                .antMatchers("/desk","/js/desk.js","/spam","/userswithouttezis", "/js/uwt.js", "/uwt").hasAnyAuthority("ADMIN")
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login")
                .permitAll()
                .and()
                .rememberMe()
                .and()
                .logout()
                .permitAll();
        http.csrf().disable();
    }

    @Override
    protected  void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService)
                .passwordEncoder(passwordEncoder);

    }

}
