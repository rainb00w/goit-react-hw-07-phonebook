import PropTypes from 'prop-types';
import s from './section.module.css';

const Section = ({ children }) => {
  return <div className={s.mainDiv}>{children}</div>;
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Section;
