import React from 'react';
import config from '../../config.json';

export const Ps1: React.FC<{ username?: string }> = ({ username }) => {
  const name = username && username.length > 0 ? username : config.ps1_username;
  return (
    <div>
      <span className="text-light-yellow dark:text-dark-yellow">{name}</span>
      <span className="text-light-gray dark:text-dark-gray">@</span>
      <span className="text-light-green dark:text-dark-green">
        {config.ps1_hostname}
      </span>
      <span className="text-light-gray dark:text-dark-gray">:$ ~ </span>
    </div>
  );
};

export default Ps1;
