import { FC, useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Speed } from "@/app/_apis/dnd5eTypings";
import { Box, Button, Chip, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

export interface CustomSpeedProps {
    currentSpeed: Speed,
    saveSpeed: (speed: Speed) => void
}

enum speedOptions { 'walk', 'fly', 'swim', 'burrow', 'climb' }

export const CustomSpeed: FC<CustomSpeedProps> = ({ currentSpeed, saveSpeed }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [editType, setEditType] = useState<speedOptions>(speedOptions.walk);
    const [speed, setSpeed] = useState(currentSpeed);

    useEffect(() => {
        setSpeed(currentSpeed);
        if(currentSpeed.walk){
            setIsEdit(false)
        }
    }, [currentSpeed]);

    function addAction() {
        setIsEdit(true);
    }

    function handleChangeSpeed(event: SelectChangeEvent<speedOptions>) {
        setEditType(event.target.value as speedOptions);
    }

    function updateSpeed(value: string, editType: speedOptions) {
        switch (editType) {
            case speedOptions.walk:
                setSpeed(a => { return { ...a, walk: value } });
                return;
            case speedOptions.fly:
                setSpeed(a => { return { ...a, fly: value } });
                return;
            case speedOptions.swim:
                setSpeed(a => { return { ...a, swim: value } });
                return;
            case speedOptions.climb:
                setSpeed(a => { return { ...a, climb: value } });
                return;
            case speedOptions.burrow:
                setSpeed(a => { return { ...a, burrow: value } });
                return;
        }
    }

    function deleteSpeed(editType: speedOptions) {
        switch (editType) {
            case speedOptions.walk:
                setSpeed(a => { return { ...a, walk: undefined } });
                return;
            case speedOptions.fly:
                setSpeed(a => { return { ...a, fly: undefined } });
                return;
            case speedOptions.swim:
                setSpeed(a => { return { ...a, swim: undefined } });
                return;
            case speedOptions.climb:
                setSpeed(a => { return { ...a, climb: undefined } });
                return;
            case speedOptions.burrow:
                setSpeed(a => { return { ...a, burrow: undefined } });
                return;
        }
    }



    function handleSave() {
        setIsEdit(false);

        if (speed.walk && !speed.walk.endsWith('ft.')) {
            speed.walk = speed.walk + " ft.";
        }
        
        if (speed.fly && !speed.fly.endsWith('ft.')) {
            speed.fly = speed.fly + " ft.";
        }
        
        if (speed.swim && !speed.swim.endsWith('ft.')) {
            speed.swim = speed.swim + " ft.";
        }
        
        if (speed.climb && !speed.climb.endsWith('ft.')) {
            speed.climb = speed.climb + " ft.";
        } 
        
        if (speed.burrow && !speed.burrow.endsWith('ft.')) {
            speed.burrow = speed.burrow + " ft.";
        }

        saveSpeed(speed);
    }

    function determineSpeedForm(editType: speedOptions) {
        if (editType == speedOptions.walk) {
            return (<TextField size="small" label="Walk" value={speed.walk} variant="outlined" onChange={x => updateSpeed(x.target.value, editType)} />);
        } else if (editType == speedOptions.fly) {
            return (<TextField size="small" label="Fly" value={speed.fly} variant="outlined" onChange={x => updateSpeed(x.target.value, editType)} />);
        } else if (editType == speedOptions.swim) {
            return (<TextField size="small" label="Swim" value={speed.swim} variant="outlined" onChange={x => updateSpeed(x.target.value, editType)} />);
        } else if (editType == speedOptions.climb) {
            return (<TextField size="small" label="Climb" value={speed.climb} variant="outlined" onChange={x => updateSpeed(x.target.value, editType)} />);
        } else if (editType == speedOptions.burrow) {
            return (<TextField size="small" label="Burrow" value={speed.burrow} variant="outlined" onChange={x => updateSpeed(x.target.value, editType)} />);
        }
    }

    return (
        <>
            {isEdit ? (<Box sx={{ margin: '10px 0' }}>
                <Grid sx={{ paddingTop: 1 }} container spacing={2}>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="recipient">Speed</InputLabel>
                            <Select
                                labelId="speed"
                                value={editType}
                                size="small"
                                label="Speed Type"
                                onChange={handleChangeSpeed}
                            >
                                <MenuItem value={speedOptions.walk}>Walk</MenuItem>
                                <MenuItem value={speedOptions.fly}>Fly</MenuItem>
                                <MenuItem value={speedOptions.swim}>Swim</MenuItem>
                                <MenuItem value={speedOptions.climb}>Climb</MenuItem>
                                <MenuItem value={speedOptions.burrow}>Burrow</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        {determineSpeedForm(editType)}
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" onClick={handleSave}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>) : (
            <Box sx={{ marginBottom: 1, paddingBottom: 1, borderBottom: '1px solid lightgrey' }} >
                {speed.walk ? (<Chip size="small" color="info" label={`Walk: ${speed.walk}`} onDelete={() => deleteSpeed(speedOptions.walk)} />) : ''}
                {speed.fly ? (<Chip size="small" color="info" label={`Fly: ${speed.fly}`} onDelete={() => deleteSpeed(speedOptions.fly)} />) : ''}
                {speed.swim ? (<Chip size="small" color="info" label={`Swim: ${speed.swim}`} onDelete={() => deleteSpeed(speedOptions.swim)} />) : ''}
                {speed.climb ? (<Chip size="small" color="info" label={`Climb: ${speed.climb}`} onDelete={() => deleteSpeed(speedOptions.climb)} />) : ''}
                {speed.burrow ? (<Chip size="small" color="info" label={`Burrow: ${speed.burrow}`} onDelete={() => deleteSpeed(speedOptions.burrow)} />) : ''}
                <Chip size="small" color="info" label="+" clickable onClick={addAction} />
            </Box>)}
        </>
    )
}