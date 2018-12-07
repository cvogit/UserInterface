import * as React from 'react';
import {Popover, PopoverHeader, PopoverBody } from 'reactstrap';
/*
  *The manager can view the associates task for current check-in on this component
*/
interface IProps {
  description: string
  show: boolean
  userId: number
}

export class DailyTasksComponent extends React.Component<IProps> {

  public render() {
    return (
      <>
        <Popover placement="top" isOpen={this.props.show} target={`row-${this.props.userId}`}>
          <PopoverHeader>Daily Tasks</PopoverHeader>
          <PopoverBody>{this.props.description}</PopoverBody>
        </Popover>
      </>
    );
  }
}

export default DailyTasksComponent