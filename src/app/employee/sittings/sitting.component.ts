import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { CalendarOptions, DateSelectArg, DayCellMountArg, EventClickArg, EventContentArg, EventDropArg, EventMountArg, EventSourceFuncArg, ViewContentArg  } from "@fullcalendar/core";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { EventDragStartArg, EventResizeDoneArg, EventResizeStartArg, EventResizeStopArg } from '@fullcalendar/interaction'; // for dateClick
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DomElementSchemaRegistry, HtmlParser } from "@angular/compiler";
import { MatDialogClose, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogAnimationsExampleDialog } from "./sitting-schedular";
import { SittingService } from "@app/_services/sitting.service";
import { EventData, NewEventData } from "@app/_interfaces/event";
import { CalendarContentProps, DayCellContainer, DayTableCell, EventImpl, ViewContainer } from "@fullcalendar/core/internal";
import { AnyComponent, RenderableProps } from "@fullcalendar/core/preact";


@Component({templateUrl: 'sitting.component.html', styleUrls: ['sitting.component.scss']})
export class SittingComponent implements OnInit, AfterViewInit
{
    constructor(private changeDetector: ChangeDetectorRef, public dialog: MatDialog, private sittingServ: SittingService) {

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
        validRange: {
            //start: '2023-05-22'
          },
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
        selectConstraint: { start: new Date().setDate(new Date().getDate())},
        events: this.handleEvents.bind(this),
        select: this.handleDateSelect.bind(this),
        eventClick: this.handleEventClick.bind(this),
        eventDragStart: this.handleDragStart.bind(this),
        eventDrop: this.handleEventDrop.bind(this),
        eventContent: this.handleEventContent.bind(this),
        dayCellContent: this.handleDayCellContent.bind(this),

        eventResize : this.handleEventResize.bind(this),
        eventResizeStart: this.handleEventResizeStart.bind(this),
        eventResizeStop: this.handleEventResizeStop.bind(this),
        eventDidMount: this.handdleEventDidMount.bind(this)
    };

    handdleEventDidMount(arg: EventMountArg)
    {
        //For event background and border styling
        if(!arg.event.durationEditable && arg.event.id != "")
        {
            arg.el.classList.add('custom-event');
            arg.el.style.backgroundColor = "rgba(210, 30, 50, 1)";
        }
        else if(arg.event.id == "")
        {
            arg.el.style.backgroundColor = "green";
            arg.el.style.borderColor = "grey";
        }
        else if(arg.isSelected)
        {
            arg.el.style.backgroundColor = "purple";
            arg.el.style.borderColor = "grey";
        }
        else if(arg.isDragging)
        {
            arg.el.style.backgroundColor = "yellow";
            arg.el.style.borderColor = "grey";
        }
        else if(arg.isResizing)
        {
            arg.el.style.backgroundColor = "black";
            arg.el.style.borderColor = "grey";
        }
        else
        {
            arg.el.style.backgroundColor = "";
            arg.el.style.borderColor = "";
        }
    }

    handleDragStart(arg:EventDragStartArg)
    {
        
    }

    handleEventResizeStop(arg:EventResizeStopArg)
    {

    }

    handleEventResizeStart(arg:EventResizeStartArg)
    {

    }

    handleEventResize(eventResize: EventResizeDoneArg)
    {
        var resizedEvent = eventResize.event;
        var calendar = eventResize.view.calendar;
        //Group update
        if(eventResize.event.groupId != null && eventResize.event.groupId != "")
        {
            this.sittingServ.updateEventSchedule(eventResize.event.id, eventResize.event.groupId, eventResize.oldEvent.start!, eventResize.event.start!, eventResize.oldEvent.end!, eventResize.event.end!).subscribe(response => {
                    eventResize.relatedEvents;
                },
                error => {
                    console.error('Failed to retrieve events:', error);
                    //failureCallback(error);
                    eventResize.revert();
                });
        }
        else{
            //Single event update
            //Talk to databse otherwise revert
            if(eventResize.event.start != null && eventResize.event.end != null)
            {
                var event = new EventData(eventResize.event.id, eventResize.event.start, eventResize.event.end, eventResize.event.extendedProps.title, eventResize.event.extendedProps.notes, eventResize.event.extendedProps.eventType);
                this.sittingServ.updateEvent(event).subscribe(event => {

                },
                error => {
                    console.error('Failed to retrieve events:', error);
                    eventResize.revert();
                });
            }
        }
        
    }

    handleDayCellContent(renderProps:DayCellMountArg, createElement:any)
    {
        if(renderProps.isPast && !renderProps.isDisabled)
        {
            renderProps.isDisabled = true;
        }
    }

    //event: EventContentArg
    handleEventContent(event:EventContentArg)
    {
        var arrayOfDomNodes:any[] = [];
        if(event.event.id == "")
        {
            var newPara = document.createElement('p');
            newPara.innerHTML = event.timeText;

            arrayOfDomNodes.push(newPara);
        }
        //For event content - have to edit colors in here for text

        const para = document.createElement('p');
        para.innerHTML = event.timeText;

        arrayOfDomNodes.push(para);
        if(event.event.startEditable)
        {
            const deleteButton = document.createElement('button');
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation();
            });
            deleteButton.classList.add('btn', 'btn-close');
            deleteButton.style.position = "absolute";
            deleteButton.style.top = "2px";
            deleteButton.style.right = "2px";
            arrayOfDomNodes.push(deleteButton);
        }
        return { domNodes: arrayOfDomNodes };
    }

    handleDateSelect(selectInfo: DateSelectArg) {
        //Create event and if database successful reset
        const title = prompt('Please enter a new title for your event');
        const calendarApi = selectInfo.view.calendar;

        if (title) {
            this.sittingServ.createEvent(new NewEventData(selectInfo.start, selectInfo.end, title, "Note", "Breakfast")).subscribe(event => {
                //calendarApi.addEvent(event);
                calendarApi.refetchEvents();
            },
            error => {
                console.error('Failed to retrieve events:', error);
                //failureCallback(error);
            });
        }
        calendarApi.unselect(); // clear date selection
    }

    handleEvents(arg:EventSourceFuncArg, successCallback:any, failureCallback:any)
    {
        console.log(arg.startStr);
        console.log(arg.endStr);
        this.sittingServ.getEvents().subscribe(events => {
            //If I want to do something before calling back to calendar
            events.forEach(el => {
            });
            successCallback(events);
        },
        error => {
            console.error('Failed to retrieve events:', error);
            failureCallback(error);
        });

    }
    
    handleEventClick(clickInfo: EventClickArg) {
        //Want to change to edit event
        if(clickInfo.event.startEditable)
        {
            if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
                clickInfo.event.remove();
            }
        }
    }

    handleEventDrop(eventDrop: EventDropArg)
    {
        var dateNow = new Date(new Date().setHours(0, 0, 0, 0));
        if(eventDrop.event.start! <= dateNow)
        {
            eventDrop.revert();
        }
        else if(eventDrop.relatedEvents.length > 0 && eventDrop.relatedEvents.some(date => date.end! <= dateNow))
        {
            eventDrop.revert();
        }
        else if(eventDrop.relatedEvents.length > 0)
        {
            //Send list of events perhaps
            this.sittingServ.updateEventSchedule(eventDrop.event.id, eventDrop.event.groupId, eventDrop.oldEvent.start!, eventDrop.event.start!, eventDrop.oldEvent.end!, eventDrop.event.end!).subscribe(response => {
                eventDrop.relatedEvents;
            },
            error => {
                console.error('Failed to retrieve events:', error);
                //failureCallback(error);
                eventDrop.revert();
            });
        }
        else
        {
            var event = new EventData(eventDrop.event.id, eventDrop.event.start!, eventDrop.event.end!, eventDrop.event.extendedProps.title, eventDrop.event.extendedProps.notes, eventDrop.event.extendedProps.eventType);
            this.sittingServ.updateEvent(event).subscribe(event => {

            },
            error => {
                console.error('Failed to retrieve events:', error);
                eventDrop.revert();
            });
        }
        //Talk to database otherwise revert
    }

    createSittingScheduleForm()
    {
        let dialogResult = this.dialog.open(DialogAnimationsExampleDialog, {
            width: 'fit-content',
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

