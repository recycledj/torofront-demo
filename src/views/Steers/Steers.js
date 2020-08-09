import React, { Fragment, useState, useEffect } from 'react';
import { Grid, Typography, makeStyles, Paper, Button } from '@material-ui/core';
import axios from 'axios';
import Dialog from '../../components/Modals/Dialog';
import Form from '../FormDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 800,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        height: '100%',
        width: '100%'
    },
    container: {
        maxWidth: '100%'
    },
    spacing: {
        marginBottom: 20,
        marginTop: 20
    }
}));

function Steers() {
    const [novillos, setNovillos] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState('');
    useEffect(() => {
        const getSteers = async () => {
            const { data } = await axios({
                method: "GET",
                url: "http://localhost:3005/api/won"
            });

            if (data) setNovillos(data);
        }
        getSteers();
    }, [])
    const setStateDialog = () => {
        setOpen(!open);
    }
    const classes = useStyles();
    return (
        <Fragment>
            <Grid container className={classes.spacing}>
                <Grid item xs={12} md={12} sm={12}>
                    <Typography component="h1" variant="h3" align="center">
                        Novillos
                    </Typography>
                    <Button variant="outlined" color="primary" onClick={() => {
                        setStateDialog()
                        setId(null);
                    }}>
                        Nuevo registro
                    </Button>
                </Grid>
            </Grid>
            <Grid container
                direction="row"
                justify="center"
                alignItems="flex-start"
                spacing={4}
                className={classes.container}
            >
                {novillos.length > 0 ? (

                    novillos.map((row, i) =>
                        (
                            <Grid item xs={4} md={4} sm={12} key={row.id}>
                                <Paper className={classes.paper}>
                                    <Grid container spacing={2}>
                                        <Grid item xs>
                                            <img className={classes.img} alt={row.codeWon} src={"http://localhost:3005/" + row.photo} />
                                        </Grid>
                                        <Grid item xs={12} sm container>
                                            <Grid item xs container direction="column" spacing={2}>
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="subtitle1">
                                                        Novillo: {row.codeWon}
                                                    </Typography>
                                                    <Typography variant="body2" gutterBottom>
                                                        <Typography variant="body2">
                                                            Peso: {row.weight} kg
                                                    </Typography>
                                                        <Typography variant="body2">
                                                            Edad: {row.age}
                                                        </Typography>
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Vacunas: {row.vaccines}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="outlined" color="primary" onClick={(e) => {
                                                        setId(row.id)
                                                        setStateDialog()
                                                    }}>
                                                        Ver datos
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle2">#{i + 1}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        ))
                ) : (
                        <Grid item xs={12} md={12} sm={12}>
                            <Typography component="h1" variant="h5" align="center">
                                Aún no hay registros.
                            </Typography>
                        </Grid>
                    )}
            </Grid>
            <Dialog open={open}>
                <Form closeDialog={setStateDialog} steerId={id} />
            </Dialog>
        </Fragment>
    )
}

export default Steers;