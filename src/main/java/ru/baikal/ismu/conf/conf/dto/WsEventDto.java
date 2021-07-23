package ru.baikal.ismu.conf.conf.dto;

import com.fasterxml.jackson.annotation.JsonRawValue;
import com.fasterxml.jackson.annotation.JsonView;
import ru.baikal.ismu.conf.conf.domain.ViewLevel;

@JsonView(ViewLevel.ForFront.class)
public class WsEventDto {
        private ObjectType objectType;
        private EventType eventType;
        @JsonRawValue
        private String body;

    public WsEventDto(ObjectType objectType, EventType eventType, String body) {
        this.objectType = objectType;
        this.eventType = eventType;
        this.body = body;
    }

    public ObjectType getObjectType() {
        return this.objectType;
    }

    public EventType getEventType() {
        return this.eventType;
    }

    public String getBody() {
        return this.body;
    }

    public void setObjectType(ObjectType objectType) {
        this.objectType = objectType;
    }

    public void setEventType(EventType eventType) {
        this.eventType = eventType;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof WsEventDto)) return false;
        final WsEventDto other = (WsEventDto) o;
        if (!other.canEqual((Object) this)) return false;
        final Object this$objectType = this.getObjectType();
        final Object other$objectType = other.getObjectType();
        if (this$objectType == null ? other$objectType != null : !this$objectType.equals(other$objectType))
            return false;
        final Object this$eventType = this.getEventType();
        final Object other$eventType = other.getEventType();
        if (this$eventType == null ? other$eventType != null : !this$eventType.equals(other$eventType)) return false;
        final Object this$body = this.getBody();
        final Object other$body = other.getBody();
        if (this$body == null ? other$body != null : !this$body.equals(other$body)) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof WsEventDto;
    }

    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final Object $objectType = this.getObjectType();
        result = result * PRIME + ($objectType == null ? 43 : $objectType.hashCode());
        final Object $eventType = this.getEventType();
        result = result * PRIME + ($eventType == null ? 43 : $eventType.hashCode());
        final Object $body = this.getBody();
        result = result * PRIME + ($body == null ? 43 : $body.hashCode());
        return result;
    }

    public String toString() {
        return "WsEventDto(objectType=" + this.getObjectType() + ", eventType=" + this.getEventType() + ", body=" + this.getBody() + ")";
    }
}
