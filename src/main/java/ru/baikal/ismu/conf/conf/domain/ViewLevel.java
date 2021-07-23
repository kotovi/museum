package ru.baikal.ismu.conf.conf.domain;

public final class ViewLevel {
    public interface MinimalList{}
    public interface ForFront extends MinimalList{}
    public interface FullMessage extends ForFront {}
}
