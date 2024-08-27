import React, { useEffect, useState } from 'react';
import outpassService from '../Services/outpassService';

function OutpassList() {
  const [outpasses, setOutpasses] = useState([]);

  useEffect(() => {
    const fetchOutpasses = async () => {
      const data = await outpassService.getOutpassesForStudent();
      setOutpasses(data);
    };
    fetchOutpasses();
  }, []);

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Your Outpasses</h3>
      {/* Render list of outpasses with status */}
    </div>
  );
}

export default OutpassList;
