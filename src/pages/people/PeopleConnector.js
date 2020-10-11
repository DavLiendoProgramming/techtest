import { connect } from 'react-redux';
// import { DataTypes } from '../../data/Types';
import * as PeopleActions from '../../data/ActionCreators';
import People from './People';

const mapDispatchToProps = {
  ...PeopleActions,
};

const PeopleConnector = connect((ds) => ds, mapDispatchToProps)(People);

export default PeopleConnector;
