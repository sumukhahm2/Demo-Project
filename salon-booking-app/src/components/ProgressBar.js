import ProgressBar from 'react-bootstrap/ProgressBar';

function LoadingBar(props) {
 
  return <ProgressBar now={props.now} label={`${props.now}%`} visuallyHidden />;
}

export default LoadingBar;