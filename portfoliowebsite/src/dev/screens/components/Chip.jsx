import React from "react";
import '../_general/config/HTMLTagConfig.css';
import '../components/css/CSS_HorizontalRule.css';
import { font } from '../_general/theme/font';

const Chip = (props) => {
    const {
        position,
        title
    } = props

    return (
        <div className="chip unselectable"
            style={{
                fontFamily: font.family.opensans,
                fontSize: 13,
            }}
        >
            {title}
        </div>
    )
}

export default Chip;