import { Canvas } from "@react-three/fiber";
import PropTypes from 'prop-types';

import Galaxy from './Galaxy'
import '../../css/gameMode.css'

const Test = ({

  }) => {
  return (
      <Canvas >
        <Galaxy 
        />
      </Canvas>
  );
};

Test.propTypes = {

};

export default Test;