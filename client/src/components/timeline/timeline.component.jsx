import React, {useEffect, useState} from "react";
import axios from "axios";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

const Action = {
    Remove: 'remove',
    Add:'add',
    StatusChange:'statusChange',
    Serviced: 'serviced'
};


const Timeline = () => {
    
    const [actions, setActions] = useState([]);
    
    useEffect(() => {
        async function fetchActions() {
            const { data } = await axios.get('/api/stat/actions');
            setActions(data);
        }
    
        fetchActions();
    }, []);
    
    const renderElement = event => {
        let icon;
        let background;
        switch (event.action) {
            case Action.Add:
                icon = <AddIcon />;
                background = '#50A3AF';
                break;
            case Action.Remove:
                icon = <DeleteIcon />;
                background = '#F3956A';
                break;
            case Action.Serviced:
                icon = <AssignmentTurnedInIcon />;
                background = '#82E59B';
                break;
            default:
                icon = <TrackChangesIcon />;
                background = '#C990FC';
        }
        return (
            <VerticalTimelineElement
                key={Math.random()}
                date={new Date(event.date).toUTCString()}
                iconStyle={{ background, color: '#fff' }}
                icon={icon}
            >
                <h4 className="vertical-timeline-element-subtitle">{event.value}</h4>
            </VerticalTimelineElement>
        )
    };
    
    return (
        <VerticalTimeline layout='1-column'>
            {actions.map(renderElement)}
        </VerticalTimeline>
    )
};

export default Timeline;
