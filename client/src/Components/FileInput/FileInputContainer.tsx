import axios from "axios";
import React from "react";
import { graphql, MutationFn } from "react-apollo";
import { toast } from "react-toastify";
import FileInputPresenter from "./FileInputPresenter";
import { SIGN_S3_URL } from "./FileInputQueries";

interface IProps {
  postUpload: (url: string) => void;
  signS3URLMutation: MutationFn;
  required: boolean;
  previousUrl: string;
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
  componentWillReceiveProps(newProps) {
    if (newProps.previousUrl) {
      this.setState({
        uploaded: true,
        fileUrl: newProps.previousUrl
      });
    }
  }
  render() {
    const { uploaded, fileUrl, uploading } = this.state;
    const { required } = this.props;
    return (
      <FileInputPresenter
        uploaded={uploaded}
        fileUrl={fileUrl}
        uploading={uploading}
        onChange={this.onChange}
        required={required}
      />
    );
  }
  private onChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { files }
    } = event;
    if (files) {
      const file = files[0];
      this.setState({
        uploading: true
      });
      this.signUrl(file);
    }
  };
  private signUrl = async (file: File) => {
    const { signS3URLMutation } = this.props;
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
      this.uploadImage(file, signedUrl, fileUrl);
    }
  };

  private uploadImage = async (
    file: File,
    signedUrl: string,
    fileUrl: string
  ) => {
    const { postUpload } = this.props;
    const headers = {
      "Content-Type": file.type
    };
    try {
      await axios.put(signedUrl, file, {
        headers
      });
      this.setState({
        fileUrl,
        uploaded: true,
        uploading: false
      });
      postUpload(fileUrl);
    } catch (error) {
      toast.error(error);
    }
  };
}
export default graphql<any, any>(SIGN_S3_URL, { name: "signS3URLMutation" })(
  FileInputContainer
);
