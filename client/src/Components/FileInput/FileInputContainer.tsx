import axios from "axios";
import React from "react";
import { graphql, MutationFn } from "react-apollo";
import FileInputPresenter from "./FileInputPresenter";
import { SIGN_S3_URL } from "./FileInputQueries";

interface IProps {
  postUpload: () => void;
  signS3URLMutation: MutationFn;
}

interface IState {
  uploaded: boolean;
  fileUrl: string;
  uploading: boolean;
}

class FileInputContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      uploaded: false,
      fileUrl: "",
      uploading: false
    };
  }
  render() {
    const { uploaded, fileUrl, uploading } = this.state;
    return (
      <FileInputPresenter
        uploaded={uploaded}
        fileUrl={fileUrl}
        uploading={uploading}
        onChange={this.onChange}
      />
    );
  }
  private onChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { signS3URLMutation } = this.props;
    this.setState({
      uploading: true
    });
    const {
      target: { files }
    } = event;
    if (files) {
      const file = files[0];
      const response: any = await signS3URLMutation({
        variables: {
          fileName: file.name,
          fileType: file.type
        }
      });
      const {
        data: { signS3URL }
      } = response;
      if (signS3URL.ok) {
        const { fileUrl, signedUrl } = signS3URL;
        try {
          await axios.put(signedUrl, file, {
            headers: {
              "Content-Type": file.type
            }
          });
          this.setState({
            fileUrl,
            uploaded: true,
            uploading: false
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
}
export default graphql<any, any>(SIGN_S3_URL, { name: "signS3URLMutation" })(
  FileInputContainer
);
