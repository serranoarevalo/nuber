import React from "react";
import FileInputPresenter from "./FileInputPresenter";

interface IProps {
  postUpload: () => void;
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
    console.log(event);
  };
}
export default FileInputContainer;
