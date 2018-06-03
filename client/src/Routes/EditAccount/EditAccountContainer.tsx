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
  password: string;
  profilePhoto: string;
}

class EditAccountContainer extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      profilePhoto: ""
    };
  }

  componentWillReceiveProps(newProps) {
    const {
      data: { me }
    } = newProps;
    if (me) {
      const { ok, user } = me;
      if (ok) {
        const { firstName, lastName, phoneNumber, email, profilePhoto } = user;
        this.setState({
          firstName,
          lastName,
          phoneNumber,
          email,
          profilePhoto
        });
      }
    }
  }

  render() {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      profilePhoto
    } = this.state;
    return (
      <Mutation
        mutation={UPDATE_ACCOUNT}
        variables={{
          firstName,
          lastName,
          phoneNumber,
          email,
          password,
          profilePhoto
        }}
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
            password={password}
            profilePhoto={profilePhoto}
            getProfileImage={this.getProfileImage}
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
      cache.writeFragment({
        id: "$ROOT_QUERY.me.user",
        fragment: USER_FRAGMENT,
        data: {
          ...updateUser.user
        }
      });
    }
  };

  private getProfileImage = (url: string): void => {
    this.setState({
      profilePhoto: url
    });
  };
}

export default graphql(ME)(EditAccountContainer);
