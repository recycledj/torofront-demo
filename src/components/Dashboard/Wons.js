import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import axios from 'axios';
import { format } from 'date-fns';

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

export default function Wons() {
    const [novillos, setNovillos] = useState([]);

    useEffect(() => {
        const getSteers = async () => {
            const { data } = await axios({
                method: "GET",
                url: "http://localhost:3005/api/won/"
            });

            if (data) setNovillos(data);
        }
        getSteers();
    }, []);
    const classes = useStyles();
    console.log(novillos)
    return (
        <React.Fragment>
            <Title>Recientes registros</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Fecha de ingreso</TableCell>
                        <TableCell>Código de novillo</TableCell>
                        <TableCell>Peso</TableCell>
                        <TableCell>Vacunas</TableCell>
                        <TableCell align="right">Edad</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {novillos.map(novillo => 
                    (
                        <TableRow key={novillo.id}>
                            <TableCell>{format(new Date(novillo.createdAt), "dd/MM/yyyy HH:mm:ss a")}</TableCell>
                            <TableCell>{novillo.codeWon}</TableCell>
                            <TableCell>{novillo.weight}kg</TableCell>
                            <TableCell>{novillo.vaccines}</TableCell>
                            <TableCell align="right">{novillo.age}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={classes.seeMore}>
                <Link to="/steers">See more</Link>
            </div>
        </React.Fragment>
    );
}