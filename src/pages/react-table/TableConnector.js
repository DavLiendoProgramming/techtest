import { connect } from 'react-redux';
// import { DataTypes } from '../../data/Types';
import * as PeopleActions from '../../data/ActionCreators';
import ReactTable from './ReactTable';

const mapDispatchToProps = {
  ...PeopleActions,
};

const TableConnector = connect((ds) => ds, mapDispatchToProps)(ReactTable);

export default TableConnector;