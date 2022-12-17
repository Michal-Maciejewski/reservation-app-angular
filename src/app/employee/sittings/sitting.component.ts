import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CalendarOptions, DateSelectArg, EventClickArg, EventDropArg  } from "@fullcalendar/core";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction'; // for dateClick
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DomElementSchemaRegistry } from "@angular/compiler";
import { MatDialogClose, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogAnimationsExampleDialog } from "./sitting-schedular";

@Component({templateUrl: 'sitting.component.html'})
export class SittingComponent implements OnInit, AfterViewInit
{
    constructor(private changeDetector: ChangeDetectorRef, public dialog: MatDialog) {

    }
    ngAfterViewInit(): void {
        //throw new Error("Method not implemented.");
        var button = document.querySelector('#createSitting');
        button?.addEventListener('click', this.createSittingScheduleForm.bind(this));
    }
    ngOnInit(): void {
        //throw new Error("Method not implemented.");
    }

    calendarVisible = true;
    calendarOptions: CalendarOptions = {
        initialView: 'timeGridWeek',
        plugins: [timeGridPlugin, interactionPlugin],
        defaultAllDay: false,
        allDaySlot: false,
        headerToolbar:{
            left: 'prev,next today',
            center: 'title',
            right: ''
        },
        viewDidMount: function(arg){
            // inject html
            var rightToolbarEl = document.querySelectorAll('.fc-toolbar-chunk')[2];
            rightToolbarEl.innerHTML = "<button id='createSitting' class='fc-button fc-button-primary' type='button' >Create Group Sitting</button>"

        },
        eventStartEditable: true,
        eventResizableFromStart: true,
        unselectAuto: true,
        editable: true,
        selectable: true,
        selectMirror: true,
        select: this.handleDateSelect.bind(this),
        eventClick: this.handleEventClick.bind(this),
        eventResize : this.handleEventResize.bind(this),
        eventDrop: this.handleEventDrop.bind(this)
    };

    handleDateSelect(selectInfo: DateSelectArg) {
        //Create event and if database successful reset
        const title = prompt('Please enter a new title for your event');
        const calendarApi = selectInfo.view.calendar;

        calendarApi.unselect(); // clear date selection

        if (title) {
            calendarApi.addEvent({
                //id: createEventId(),
                id: "1",
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            });
        }
    }
    
    handleEventClick(clickInfo: EventClickArg) {
        //Want to change to edit event
        if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
            clickInfo.event.remove();
        }
    }

    handleEventResize(eventResize: EventResizeDoneArg)
    {
        //Talk to databse otherwise revert
    }

    handleEventDrop(eventDrop: EventDropArg)
    {
        //Talk to database otherwise revert
    }

    createSittingScheduleForm()
    {
        let dialogResult = this.dialog.open(DialogAnimationsExampleDialog, {
            width: '100%',
            data: {sittingType: '', notes: ''},
          });

        dialogResult.afterClosed().subscribe(res =>{
            if(res != undefined)
            {
                var form = res.data;
            }
            //Do something with the form data.
        });
    }
}

