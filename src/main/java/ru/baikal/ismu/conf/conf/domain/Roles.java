package ru.baikal.ismu.conf.conf.domain;

import org.springframework.security.core.GrantedAuthority;

public enum Roles implements GrantedAuthority {
    USER,ADMIN,MODERATOR;

    @Override
    public String getAuthority() {
        return name();
    }
}
