import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const StatCard = ({ backgroundImage, title, value }) => {
    const useStyles = makeStyles({
        root: {
            minWidth: 225,
            maxHeight: 80,
            backgroundImage,
            color: '#fff',
            borderRadius: 10
        },
        title: {
            fontSize: 16,
            color: '#fff'
        },
        value: {
            fontSize: 24,
            color: '#fff',
            fontWeight: 800,
            paddingRight: 20,
            textAlign: 'right'
        }
    });
    
    const classes = useStyles();
    
    return (
        <Card className={classes.root} variant="outlined" styles={{width: '100%'}}>
            <CardContent>
                <Typography className={classes.title}>
                    {title}
                </Typography>
                <Typography className={classes.value}>
                    {value}
                </Typography>
            </CardContent>
        </Card>
    )
};

export default StatCard;
