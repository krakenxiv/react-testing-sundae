import { useEffect, useState } from 'react';
import axios from 'axios';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import Row from 'react-bootstrap/Row';

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        //TODO! set up error handling
      });
  }, [optionType]);

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;
  const optionItems = items.map((item) => (
    <ItemComponent key={item.name} name={item.name} imgPath={item.imagePath} />
  ));
  return <Row>{optionItems}</Row>;
};

export default Options;
