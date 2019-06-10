import React from 'react';
import './SynonymsList.css';

import SynonymButton from '../synonym-button/SynonymButton';

const SynonymsList = (props) => {
  return (
    <div className="synonyms-list">
      <h3>Synonyms List</h3>
      <div>
        { props.synonyms.map((synonym, i) => {
          if (i < 10) {
            return (
              <SynonymButton
                key={i}
                synonym={synonym}
                insertHTML={props.insertHTML}/>)
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default SynonymsList;