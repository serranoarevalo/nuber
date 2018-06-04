import React from "react";
import { Mutation } from "react-apollo";
import { toast } from "react-toastify";
import AddPhonePresenter from "./AddPhonePresenter";
import { ADD_PHONE } from "./AddPhoneQueries";

interface IState {
  countryCode: string;
  phoneNumber: string;
}

class AddPhoneContainer extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      countryCode: "+82",
      phoneNumber: ""
    };
  }
  render() {
    const { countryCode, phoneNumber } = this.state;
    return (
      <Mutation
        mutation={ADD_PHONE}
        update={this.handlePostSubmit}
        variables={{ phoneNumber: `${countryCode}${phoneNumber}` }}
      >
        {(addPhone, { loading }) => (
          <AddPhonePresenter
            countryCode={countryCode}
            phoneNumber={phoneNumber}
            handleInputChange={this.handleInputChange}
            onSubmit={addPhone}
            loading={loading}
          />
        )}
      </Mutation>
    );
  }
  private handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value, name }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };

  private handlePostSubmit = (cache, { data }) => {
    const { countryCode, phoneNumber } = this.state;
    const { addPhone } = data;
    const { history } = this.props;
    if (addPhone.ok) {
      toast.success("SMS Sent, redirecting you...");
      setTimeout(
        () =>
          history.push({
            pathname: "/verify-phone",
            state: {
              phone: `${countryCode}${phoneNumber}`
            }
          }),
        2000
      );
    } else if (!addPhone.ok && addPhone.error) {
      toast.error(addPhone.error);
    }
  };
}

export default AddPhoneContainer;
