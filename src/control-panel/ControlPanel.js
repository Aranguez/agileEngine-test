import React from 'react';

import StyleButton from '../style-button/StyleButton';
import './ControlPanel.css';

const ControlPanel = (props) => {
	return (
		<div className="control-panel">
			<div>
				{ props.textStyles.map((action, i) => {
					return (
						<StyleButton
							key={i}
							action={action}
							execCmd={props.execCmd}/>
					)
				})}
			</div>
			<div>
				{ props.colors.map((action, i) => {
					return (
						<StyleButton
							key={i}
							action={action}
							execCmd={props.execCmd}/>
					)
				})}
			</div>
		</div>
	);
}

export default ControlPanel;
