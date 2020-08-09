import React, { Fragment, useEffect, useState } from 'react';
import { Grid, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import dateFns from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import axios from 'axios';
import { format } from 'date-fns';

const initState = {
    codeWon: '',
    age: '',
    weight: '',
    codeMother: '',
    codeFather: '',
    dateOfBirth: '',
    vaccines: '',
    observations: '',
    idGender: '',
    lot: '',
    photo: ''
};
function Form({ closeDialog, steerId }) {
    const [genders, setGenders] = useState([]);
    const [novillo, setNovillo] = useState(initState);
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        if (steerId) {
            const getInformationSteer = async () => {
                const { data } = await axios({
                    method: "GET",
                    url: "http://localhost:3005/api/steer/",
                    params: { id: steerId }
                });
                if (data) setNovillo(data);
            }
            getInformationSteer();
        } else {
            setNovillo(initState)
        }
        const getGenders = async () => {
            try {
                const { data } = await axios({
                    method: "GET",
                    url: "http://localhost:3005/api/gender"
                });
                if (data) setGenders(data);
            } catch (error) {
                console.log(error);
            }
        }
        getGenders();
    }, [steerId, closeDialog]);

    const onChange = (e) => {
        const { name, value } = e.target;
        const objectSteer = { ...novillo };
        objectSteer[name] = value;
        setNovillo(objectSteer);
    }
    const submitChanges = async () => {
        try {
            const formData = new FormData();
            if (!steerId) {
                const fileInput = document.querySelector("#photo");
                formData.append("codeWon", novillo.codeWon);
                formData.append("age", novillo.age);
                formData.append("idGender", novillo.idGender);
                formData.append("codeMother", novillo.codeMother);
                formData.append("codeFather", novillo.codeFather);
                formData.append("vaccines", novillo.vaccines);
                formData.append("observations", novillo.observations);
                formData.append("weight", novillo.weight);
                formData.append("dateOfBirth", format(date, "yyyy-MM-dd"));
                formData.append("lot", novillo.lot);
                formData.append("photo", fileInput.files[0]);

                const { data } = await axios({
                    method: "POST",
                    url: "http://localhost:3005/api/won/",
                    data: formData
                });

                if (data) closeDialog();
            } else {
                formData.append("codeWon", novillo.codeWon);
                formData.append("age", novillo.age);
                formData.append("idGender", novillo.idGender.id);
                formData.append("codeMother", novillo.codeMother);
                formData.append("codeFather", novillo.codeFather);
                formData.append("vaccines", novillo.vaccines);
                formData.append("observations", novillo.observations);
                formData.append("weight", novillo.weight);
                formData.append("dateOfBirth", date);
                formData.append("lot", novillo.lot);

                const { data } = await axios({
                    method: "PATCH",
                    url: "http://localhost:3005/api/won/",
                    params: { id: steerId }
                });

                if (data) console.log("Success!");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Fragment>
            <Grid container>
                <Grid item xs={12} md={12} sm={12}>
                    {/* <DialogTitle id="form-dialog-title"></DialogTitle> */}
                    <DialogContent>
                        {/* <DialogContentText>
                            LLena los campos del siguiente formulario.
          </DialogContentText> */}
                        <FormControl>
                            <Grid container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                spacing={3}
                            >
                                <Grid item xs={5} md={5} sm={12}>
                                    <TextField
                                        autoFocus
                                        name="codeWon"
                                        margin="dense"
                                        label="Código de novillo"
                                        type="text"
                                        fullWidth
                                        value={novillo.codeWon}
                                        onChange={onChange}
                                    />
                                </Grid>
                                <Grid item xs={5} md={5} sm={12}>
                                    <TextField
                                        autoFocus
                                        name="age"
                                        margin="dense"
                                        id="age"
                                        label="Edad"
                                        type="text"
                                        fullWidth
                                        value={novillo.age || ""}
                                        onChange={onChange}
                                    />
                                </Grid>
                                <Grid item xs={3} md={3} sm={12}>
                                    <TextField
                                        autoFocus
                                        name="weight"
                                        margin="dense"
                                        id="weight"
                                        label="Peso"
                                        type="text"
                                        fullWidth
                                        value={novillo.weight || ""}
                                        onChange={onChange}
                                    />
                                </Grid>
                                <Grid item xs={3} md={3} sm={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>Sexo</InputLabel>
                                        <Select name="idGender" value={novillo?.idGender?.id ? novillo?.idGender?.id : novillo.idGender} onChange={onChange}>
                                            {genders.map((gender) => (
                                                <MenuItem key={gender.id} value={gender.id}>{gender.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3} md={3} sm={12}>
                                    <TextField
                                        autoFocus
                                        name="lot"
                                        margin="dense"
                                        id="lot"
                                        label="Lote"
                                        type="text"
                                        fullWidth
                                        value={novillo.lot || ""}
                                        onChange={onChange}
                                    />
                                </Grid>
                                <Grid item xs={5} md={5} sm={12}>
                                    <MuiPickersUtilsProvider utils={dateFns}>
                                        <KeyboardDatePicker
                                            fullWidth={true}
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Fecha de nacimiento"
                                            format="MM/dd/yyyy"
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            value={date ? date : novillo.dateOfBirth}
                                            onChange={(date) => setDate(date)}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item xs={5} md={5} sm={12}>
                                    <TextField
                                        autoFocus
                                        name="photo"
                                        margin="dense"
                                        id="photo"
                                        label="Foto"
                                        type="file"
                                        fullWidth
                                        disabled={novillo.photo ? true : false}
                                        onChange={onChange}
                                    />
                                </Grid>
                                <Grid item xs={5} md={5} sm={12}>
                                    <TextField
                                        autoFocus
                                        name="codeMother"
                                        margin="dense"
                                        id="codeMother"
                                        label="Código de madre"
                                        type="text"
                                        fullWidth
                                        value={novillo.codeMother || ""}
                                        onChange={onChange}
                                    />
                                </Grid>
                                <Grid item xs={5} md={5} sm={12}>
                                    <TextField
                                        autoFocus
                                        name="codeFather"
                                        margin="dense"
                                        id="codeFather"
                                        label="Código de padre"
                                        type="text"
                                        fullWidth
                                        value={novillo.codeFather || ""}
                                        onChange={onChange}
                                    />
                                </Grid>
                                <Grid item xs={5} md={5} sm={12}>
                                    <TextField
                                        autoFocus
                                        multiline
                                        name="vaccines"
                                        margin="dense"
                                        id="vaccines"
                                        label="Vacunas aplicadas"
                                        type="text"
                                        fullWidth
                                        value={novillo.vaccines || ""}
                                        onChange={onChange}
                                    />
                                </Grid>
                                <Grid item xs={5} md={5} sm={12}>
                                    <TextField
                                        autoFocus
                                        name="observations"
                                        margin="dense"
                                        id="observations"
                                        label="Observaciones"
                                        type="text"
                                        fullWidth
                                        value={novillo.observations || ""}
                                        onChange={onChange}
                                    />
                                </Grid>
                            </Grid>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        {steerId ? (
                            <>
                                <Button onClick={closeDialog} color="primary">
                                    Cerrar
                                </Button>
                            </>
                        ) : <Button onClick={closeDialog} color="primary">
                                Cancelar
                            </Button>}
                        {!steerId && (
                            <Button color="primary" onClick={submitChanges}>
                                Guardar
                            </Button>
                        )}
                    </DialogActions>
                </Grid>
            </Grid>
        </Fragment>
    )
}
export default Form;