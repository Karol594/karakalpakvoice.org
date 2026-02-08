import React from 'react';
import QaraUy from '../components/QaraUy'; // Тек ғана Қара Үй компонентин шақырамыз

const Tradition = () => {
  return (
    <div className="tradition-page-wrapper">
         {/* Бул жерде тек Қара Үй шығады */}
         <QaraUy /> 
    </div>
  );
};

export default Tradition;