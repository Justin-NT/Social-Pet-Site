import React, { createRef, SyntheticEvent } from "react";

interface CommentProps {
  onSubmit: any;
  onClose: any;
}

interface CommentState {
  value: any;
}

class commentModal extends React.Component<CommentProps, CommentState> {
  inputRef: React.RefObject<any>;
  constructor(props: any) {
    super(props);
    this.inputRef = createRef();
    this.state = { value: props.initialValue };
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  onChange = (e: SyntheticEvent) => {
    this.setState({ value: e.target.value });
  };

  onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { value } = this.state;
    const { onSubmit, onClose } = this.props;
    onSubmit(value);
    onClose();
  };

  render() {
    const { value } = this.state;

    return (
      <div className="modal--overlay">
        <div className="modal">
          <h1>Insert a new value</h1>
          <form action="?" onSubmit={this.onSubmit}>
            <input
              ref={this.inputRef}
              type="text"
              onChange={this.onChange}
              value={value}
            />
            <button>Save new value</button>
          </form>
        </div>
      </div>
    );
  }
}

export default commentModal;
