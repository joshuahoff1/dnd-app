import { FC, useContext, useState } from "react";
import Chip from '@mui/material/Chip';
import { ConditionsContext } from "./page";
import { getCondition } from "@/app/_apis/dnd5eApi";
import { Tooltip } from "@mui/material";

export interface ConditionItemProps {
    conditionId: string,
    onDeleteCondition: (condition: string) => void
}

export const ConditionItem: FC<ConditionItemProps> = ({conditionId, onDeleteCondition}) => {
    const conditionOptions = useContext(ConditionsContext);
    const [description, setDescription] = useState('');

    function getDescription(){
        getCondition(conditionId)
        .then(c => setDescription(c.desc!));
    }

    let name = conditionOptions.find(x => x.index == conditionId)?.name;

    return (<>
    <Tooltip disableFocusListener title={description}>
        <Chip color="info" size="small" clickable onClick={getDescription} label={name} onDelete={() => onDeleteCondition(conditionId)} />
    </Tooltip>
    </>);
}