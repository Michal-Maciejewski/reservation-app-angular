import { cl } from "@fullcalendar/core/internal-common";

export class NewEventData{
    start: Date;
    end: Date;
    title: string;
    notes: string;
    eventType: string;

    constructor(start:Date, end:Date, title:string, notes:string, eventType:string)
    {
        this.start = start;
        this.end = end;
        this.title = title;
        this.notes = notes;
        this.eventType = eventType;
    }
}

export class EventData{
    id: string;
    start: Date;
    end: Date;
    title: string;
    notes: string;
    eventType: string;

    constructor(id: string, start:Date, end:Date, title:string, notes:string, eventType:string)
    {
        this.id = id;
        this.start = start;
        this.end = end;
        this.title = title;
        this.notes = notes;
        this.eventType = eventType;
    }
}

export class EventDataGroup extends EventData{
    groupId: string;

    constructor(id: string, start:Date, end:Date, title:string, notes:string, eventType:string, groupId:string)
    {
        super(id, start, end, title, notes, eventType);

        this.groupId = groupId;
    }
}