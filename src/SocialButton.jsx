import React from "react";
import SocialLogin from "react-social-login";
import Button from "react-bootstrap/Button";

class SocialButton extends React.Component {
  render() {
    return (
      <Button onClick={this.props.triggerLogin} {...this.props}>
        {this.props.children}
      </Button>
    );
  }
};

export default SocialLogin(SocialButton);