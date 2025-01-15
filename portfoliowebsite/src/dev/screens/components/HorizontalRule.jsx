import React from "react";
import '../_general/config/HTMLTagConfig.css';
import '../components/css/CSS_HorizontalRule.css';
import { font } from '../_general/theme/font';

import Chip from './Chip';

const HorizontalRule = (props) => {
    const {
        theme,
        title,
        position,
    } = props;

    return (
        <div className="component">
            <hr className="horizontalRule" />
            {title && (
                <div className="chip unselectable"
                    style={{
                        fontFamily: font.family.opensans,
                        fontSize: 13,
                    }}
                >
                    {title}
                </div>
            )}
        </div>
    )
}

export default HorizontalRule;