import { Alert } from 'react-bootstrap'

function AlertMessage({message, variant}) {
  return(
    <Alert variant={variant}>
      {message}
  </Alert>
  )
}

export default AlertMessage;