export interface EventData{
    id: string;
    start: Date;
    end: Date;
    title: string;
    note: string;
    eventType: string;
}

export interface EventDataGroup extends EventData{
    groupId: string;
}