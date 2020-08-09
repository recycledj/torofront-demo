import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import axios from 'axios';
import { format } from 'date-fns';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function Steets() {
    const [novillos, setNovillos] = useState('');
    const [dateNow, setDateNow] = useState('');

    const getSteets = async () => {
        try {
            const { data } = await axios({
                method: "GET",
                url: "http://localhost:3005/api/won/count"
            });

            if (data) {
                setNovillos(data);
                const date = format(new Date(), "dd MMMM, yyyy");
                if (date) setDateNow(date);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSteets();
    }, [novillos])

    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Total de novillos</Title>
            <Typography component="p" variant="h4">
                {novillos}
      </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                on {dateNow}
      </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    View balance
        </Link>
            </div>
        </React.Fragment>
    );
}