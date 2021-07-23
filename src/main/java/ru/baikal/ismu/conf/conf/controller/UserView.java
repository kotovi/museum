package ru.baikal.ismu.conf.conf.controller;

public final class UserView {
    public interface ForNotification {}
    public interface ForNb extends ForNotification{}
    public  interface ForUserList extends ForNb{}
    public interface FullUserList extends ForUserList{}
}

