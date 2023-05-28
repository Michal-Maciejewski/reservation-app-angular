import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EventData, NewEventData } from "@app/_interfaces/event";
import { environment } from "@environments/environment";
import { Duration } from "@fullcalendar/core";
import { Observable, map } from "rxjs";

@Injectable({providedIn: 'root'})
export class SittingService {

     constructor(private http: HttpClient) { }

     getEventsPost(start: Date, end:Date): Observable<EventData[]>
     {
          return this.http.post<EventData[]>(environment.ApiUrl + 'sitting', { start: start, end: end });
     }

     getEvents(): Observable<any[]>
     {
          return this.http.get<any[]>(environment.ApiUrl + 'sitting');
     }

     createEvent(event:NewEventData): Observable<EventData>
     {
          return this.http.post<EventData>(environment.ApiUrl + 'sitting/createsitting', event);
     }

     updateEvent(event:EventData):Observable<EventData>
     {
          return this.http.put<EventData>(environment.ApiUrl + 'sitting/updatesitting', event);
     }

     updateEventSchedule(id:string, groupId:string, start:Date, startNew:Date, end:Date, endNew:Date): Observable<any>
     {
          return this.http.put(environment.ApiUrl + 'sitting/updateschedule', {id: id, groupId : groupId, start: start, startNew: startNew, end: end, endNew: endNew});
     }
}