import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, CustomInput, Form, FormGroup, Input, Label } from 'reactstrap';
import withRedirect from '../hoc/withRedirect';
import { emailIsValid } from '../helpers/utils';

const SignupForm = ({ setRedirect, setRedirectUrl, hasLabel }) => {
  // State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  // Handler
  const handleSubmit = e => {
    e.preventDefault();
    //toast.success(`Successfully registered as ${name}`);
    setRedirect(true);
  };

  useEffect(() => {
    setRedirectUrl(`/authentication/signin`);
  }, [setRedirectUrl]);

  useEffect(() => {
    setIsDisabled(!name || !emailIsValid(email) || !password || !confirmPassword || !isAccepted || password !== confirmPassword);
  }, [name, email, password, confirmPassword, isAccepted]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        {hasLabel && <Label>Name</Label>}
        <Input 
        placeholder={!hasLabel ? 'Name' : ''} value={name} 
        onChange={({ target }) => setName(target.value)} 
        required
        autoComplete="new-name"
        />
      </FormGroup>
      <FormGroup>
        {hasLabel && <Label>Email address</Label>}
        <Input
          placeholder={!hasLabel ? 'Email address' : ''}
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          type="email"
          required
          autoComplete="new-username"
        />
      </FormGroup>
      <div className="form-row">
        <FormGroup className="col-6">
          {hasLabel && <Label>Password</Label>}
          <Input
            placeholder={!hasLabel ? 'Password' : ''}
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="password"
            autoComplete="new-password"
          />
        </FormGroup>
        <FormGroup className="col-6">
          {hasLabel && <Label>Confirm Password</Label>}
          <Input
            placeholder={!hasLabel ? 'Confirm Password' : ''}
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
            type="password"
            autoComplete="new-password"
          />
        </FormGroup>
      </div>

      <CustomInput
        id="customCheckTerms"
        label={
          <Fragment>
            I accept the <Link to="#!">terms</Link> and <Link to="#!">privacy policy</Link>
          </Fragment>
        }
        checked={isAccepted}
        onChange={({ target }) => setIsAccepted(target.checked)}
        type="checkbox"
      />
      <FormGroup>
        <Button color="primary" block className="mt-3" disabled={isDisabled}>
          Register
        </Button>
      </FormGroup>
    </Form>
  );
};

SignupForm.propTypes = {
  setRedirect: PropTypes.func.isRequired,
  setRedirectUrl: PropTypes.func.isRequired,
  hasLabel: PropTypes.bool
};

SignupForm.defaultProps = {
  hasLabel: false
};

export default withRedirect(SignupForm);
