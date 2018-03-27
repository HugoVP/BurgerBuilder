import PropTypes from 'prop-types';

function aux(props) {
    return props.children;
}

aux.propTypes = {
    children: PropTypes.node.isRequired,
}

export default aux;