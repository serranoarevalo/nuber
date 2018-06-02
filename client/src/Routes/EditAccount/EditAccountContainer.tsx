import React from "react";
import { graphql, Mutation, MutationUpdaterFn } from "react-apollo";
import { toast } from "react-toastify";
import EditAccountPresenter from "./EditAccountPresenter";
import { ME, UPDATE_ACCOUNT, USER_FRAGMENT } from "./EditAccountQueries";

interface IState {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

class EditAccountContainer extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: ""
    };
  }

  componentWillReceiveProps(newProps) {
    const {
      data: { me }
    } = newProps;
    if (me) {
      const { ok, user } = me;
      if (ok) {
        const { firstName, lastName, phoneNumber, email } = user;
        this.setState({
          firstName,
          lastName,
          phoneNumber,
          email
        });
      }
    }
  }

  render() {
    const { firstName, lastName, phoneNumber, email } = this.state;
    return (
      <Mutation
        mutation={UPDATE_ACCOUNT}
        variables={{ firstName, lastName, phoneNumber, email }}
        update={this.handlePostSubmit}
      >
        {(updateAccount, { loading }) => (
          <EditAccountPresenter
            firstName={firstName}
            lastName={lastName}
            phoneNumber={phoneNumber}
            email={email}
            handleInputChange={this.handleInputChange}
            onSubmit={updateAccount}
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

  private handlePostSubmit: MutationUpdaterFn = (
    cache,
    { data }: { data: any }
  ) => {
    const { updateUser } = data;
    if (!updateUser.ok && updateUser.error) {
      toast.error(updateUser.error);
    } else if (updateUser.ok) {
      toast.success("Account successfully updated");
      const me = cache.writeFragment({
        id: "$ROOT_QUERY.me.user",
        fragment: USER_FRAGMENT,
        data: {
          ...updateUser.user
        }
      });
      console.log(me);
    }
  };
}

export default graphql(ME)(EditAccountContainer);
