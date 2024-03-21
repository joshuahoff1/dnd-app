import { FC, useContext, useEffect, useState } from "react";
import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import { APIReference, Action, Monster, SpecialAbility, Speed } from "@/app/_apis/dnd5eTypings";
import { CustomActions } from "./custom-actions-list";
import { CustomAbilities } from "./custom-ability-list";
import { CustomSpeed } from "./custom-speed";
import { SessionContext } from "@/app/common/session-context";
import { getCustomMonster, getCustomMonsters, CUSTOM_MONSTER, CUSTOM_MONSTER_OPTION } from "@/app/_apis/customMonsterApi";

export interface AddCustomCharacterProps {
    currentMonsterInfo: Monster,
    onAddClick: (monster: Monster) => void
}

export const AddCustomCharacter: FC<AddCustomCharacterProps> = ({ currentMonsterInfo, onAddClick }) => {
    const [monsterInfo, setMonsterInfo] = useState<Monster>(currentMonsterInfo);
    const [hpRoll, setHpRoll] = useState('');

    useEffect(() => {
        setMonsterInfo(currentMonsterInfo);
        setHpRoll(currentMonsterInfo.hit_points_roll);
    }, [currentMonsterInfo]);

    function handleSubmit(): void {
        onAddClick(monsterInfo);
        resetForm();
    }

    function resetForm() {
        setMonsterInfo(CUSTOM_MONSTER);
    }

    function setHp(value: string) {
        let newMonster: Monster;
        const num = Number.parseInt(value ? value : '0');
        newMonster = { ...monsterInfo, hit_points: num }
        setMonsterInfo(m => newMonster);
    }

    function handleSetHpRoll(value: string) {
        let newMonster: Monster;
        setHpRoll(value);

        if (value.indexOf('d') > 0) {
            var values = RegExp(/(\d+)d(\d+)(\+|\-*)(\d*)/);
            const result = values.exec(value);

            if (result) {
                newMonster = { ...monsterInfo, hit_points_roll: value }
                setMonsterInfo(m => newMonster);
                return;
            }
        }

        if (monsterInfo.hit_points_roll != '') {
            newMonster = { ...monsterInfo, hit_points_roll: value }
            setMonsterInfo(m => newMonster);
        }
    }

    function setStrength(value: string) {
        const num = Number.parseInt(value ? value : '0');
        setMonsterInfo(m => { return { ...m, strength: num }; });
    }

    function setDexterity(value: string) {
        const num = Number.parseInt(value ? value : '0');
        const newMonster: Monster = { ...monsterInfo, dexterity: num }
        setMonsterInfo(m => newMonster);
    }

    function setConstitution(value: string) {
        const num = Number.parseInt(value ? value : '0');
        setMonsterInfo(m => { return { ...m, constitution: num }; });
    }

    function setIntelligence(value: string) {
        const num = Number.parseInt(value ? value : '0');
        setMonsterInfo(m => { return { ...m, intelligence: num }; });
    }

    function setWisdom(value: string) {
        const num = Number.parseInt(value ? value : '0');
        setMonsterInfo(m => { return { ...m, wisdom: num }; });
    }

    function setCharisma(value: string) {
        const num = Number.parseInt(value ? value : '0');
        setMonsterInfo(m => { return { ...m, charisma: num }; });
    }

    function setName(value: string) {
        setMonsterInfo(m => { return { ...m, name: value }; });
    }

    function setSpeed(value: Speed) {
        setMonsterInfo(m => { return { ...m, speed: value }; });
    }

    function setAC(value: string) {
        const num = Number.parseInt(value ? value : '0');
        let currentAC = monsterInfo.armor_class[0];
        currentAC.value = num;
        setMonsterInfo(m => { return { ...m, armor_class: [currentAC] }; });
    }

    function setProficiency(value: string) {
        const num = Number.parseInt(value ? value : '0');
        setMonsterInfo(m => { return { ...m, proficiency_bonus: num }; });
    }

    function setActions(actions: Action[]) {
        setMonsterInfo(m => { return { ...m, actions: actions }; });
    }

    function setLedgendaryActions(actions: Action[]) {
        setMonsterInfo(m => { return { ...m, legendary_actions: actions }; });
    }

    function setSpecialAbilities(abilities: SpecialAbility[]) {
        setMonsterInfo(m => { return { ...m, special_abilities: abilities }; });
    }

    function setReactions(reactions: Action[]) {
        setMonsterInfo(m => { return { ...m, reactions: reactions }; });
    }

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ margin: '10px 0' }}>
                    <TextField sx={{ width: 300 }} size="small" label="Name" value={monsterInfo.name} variant="outlined" onChange={x => setName(x.target.value)} />
                </Box>
                <Box sx={{ margin: '10px 0' }}>
                    <div className="bold-label">Speed</div>
                    <CustomSpeed currentSpeed={monsterInfo.speed} saveSpeed={setSpeed} />
                </Box>
                <Box>
                    <div className="bold-label">Skills</div>
                    <Grid sx={{ paddingTop: 1 }} container spacing={2}>
                        <Grid item xs={4}>
                            <TextField size="small" label="Strength" value={monsterInfo.strength} variant="outlined" onChange={x => setStrength(x.target.value)} />
                            <TextField size="small" label="Dexterity" value={monsterInfo.dexterity} variant="outlined" onChange={x => setDexterity(x.target.value)} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField size="small" label="Constution" value={monsterInfo.constitution} variant="outlined" onChange={x => setConstitution(x.target.value)} />
                            <TextField size="small" label="Intelligence" value={monsterInfo.intelligence} variant="outlined" onChange={x => setIntelligence(x.target.value)} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField size="small" label="Wisdom" value={monsterInfo.wisdom} variant="outlined" onChange={x => setWisdom(x.target.value)} />
                            <TextField size="small" label="Charisma" value={monsterInfo.charisma} variant="outlined" onChange={x => setCharisma(x.target.value)} />
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ margin: '10px 0' }}>
                    <div className="bold-label">HP</div>
                    <TextField sx={{ width: 300 }} size="small" helperText="Example: 4d6+2" label="HP Roll" value={hpRoll} variant="outlined" onChange={x => handleSetHpRoll(x.target.value)} />
                    <TextField sx={{ width: 300 }} size="small" label="HP" value={monsterInfo.hit_points} variant="outlined" onChange={x => setHp(x.target.value)} />
                </Box>
                <Box sx={{ margin: '10px 0' }}>
                    <TextField sx={{ width: 300 }} size="small" label="AC" value={monsterInfo.armor_class[0].value} variant="outlined" onChange={x => setAC(x.target.value)} />
                </Box>
                <Box sx={{ margin: '10px 0' }}>
                    <TextField sx={{ width: 300 }} size="small" label="Proficiency Bonus" value={monsterInfo.proficiency_bonus} variant="outlined" onChange={x => setProficiency(x.target.value)} />
                </Box>
                <Box sx={{ margin: '10px 0' }}>
                    <div className="bold-label">Actions</div>
                    <CustomActions currentActions={monsterInfo.actions} updateActions={setActions} />
                </Box>
                <Box sx={{ margin: '10px 0' }}>
                    <div className="bold-label">Legendary Actions</div>
                    <CustomActions currentActions={monsterInfo.legendary_actions} updateActions={setLedgendaryActions} />
                </Box>
                <Box sx={{ margin: '10px 0' }}>
                    <div className="bold-label">SpecialAbilities</div>
                    <CustomAbilities currentAbilities={monsterInfo.special_abilities} updateAbilities={setSpecialAbilities} />
                </Box>
                <Box sx={{ margin: '10px 0' }}>
                    <div className="bold-label">Reactions</div>
                    <CustomActions currentActions={monsterInfo.reactions} updateActions={setReactions} />
                </Box>
                <Box sx={{ margin: '10px 0' }}>
                    <Button fullWidth variant="contained" aria-label="add" onClick={handleSubmit}>
                        Add
                    </Button>
                </Box>
            </Box>
        </>
    )
}
